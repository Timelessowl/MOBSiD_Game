# chat/consumers.py
import json
import time
from .models import TestModel

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer

# from channels.generic.websocket import AsyncWebsocketConsumer
from django.core.exceptions import ValidationError


class ProgressBarConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.temperature = self.scope["url_route"]["kwargs"]["temperature"]
        self.room_group_name = f"chat_{self.room_name}"

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name, self.channel_name
        )

        self.accept()

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                "type": "make_cake",
                "message": {
                    "message": "The cake is ready",
                    "progress": "6",
                },
            },
        )

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name, self.channel_name
        )

    def send_progress_msg(self, msg, progress):
        self.send(
            text_data=json.dumps(
                {
                    "type": "progress",
                    "message": msg,
                    "progress": progress,
                }
            )
        )

    def send_completed_msg(self, msg, progress):
        self.send(
            text_data=json.dumps(
                {
                    "type": "completed",
                    "message": msg,
                    "progress": progress,
                }
            )
        )

    def send_error_msg(self, msg):
        if not isinstance(msg, str):
            msg = (
                msg.args[0] if hasattr(msg, "args") and len(msg.args) > 0 else str(msg)
            )
        self.send(text_data=json.dumps({"type": "error", "message": msg}))

    def make_cake(self, event):
        message = event["message"]

        # self.send_progress_msg("Baking", 4)
        # try:
        #     self.bake()
        # except ValidationError as e:
        #     self.send_error_msg(e)
        #     return None
        self.handle_progress_change()
        self.cool_and_frost()
        self.send_completed_msg(message.get("message"), message.get("progress"))
        # self.disconnect(1000)

    def gather_ingredients(self):
        time.sleep(1)

    def prepare_the_batter(self):
        time.sleep(1)

    def prepare_cake_pans(self):
        time.sleep(1)

    def bake(self):
        time.sleep(2)
        if self.temperature == "high":
            raise ValidationError("Temperature was too high, the cake burned")

    def cool_and_frost(self):
        time.sleep(1)

    def handle_progress_change(self):
        test_obj = TestModel.objects.get(testId=2)
        self.send_progress_msg(test_obj.title, 3)
        time.sleep(5)
