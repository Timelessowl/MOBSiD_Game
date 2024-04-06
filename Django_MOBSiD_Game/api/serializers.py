from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from rest_framework.exceptions import ValidationError
from .models import *
import json

UserModel = get_user_model()


class AppAddQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionModel
        fields = '__all__'

        def create(self, data):
            question_object = QuestionModel.objects.add_question(text=data['text'], ans=data['answer'])
            question_object.save()
            return question_object


class AppQuestionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionModel
        fields = ('text', 'op1', 'op2', 'op3', 'op4', 'op5', 'answer')


class UserProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsersProgress
        fields = ('position', 'progress')

    def reset_progress(self):
        progress_obj = UsersProgress.objects.get(user_id=1)
        progress_obj.position = 0
        progress_obj.progress = json.dumps([1, {"isAnsCor":'no', 'Tries':5}])
        progress_obj.save()


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = '__all__'

    def create(self, clean_data):
        if clean_data['isSuperuser']:
            user_obj = UserModel.objects.create_superuser(email=clean_data['email'], password=clean_data['password'],
                                                          adminkey=clean_data['adminKey'])
            user_obj.username = clean_data['username']
            user_obj.isSuperuser = clean_data['isSuperuser']
        else:
            user_obj = UserModel.objects.create_user(email=clean_data['email'], password=clean_data['password'])
            user_obj.username = clean_data['username']
        user_obj.save()
        return user_obj


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    ##
    def check_user(self, clean_data):
        user = authenticate(username=clean_data['email'], password=clean_data['password'])
        if not user:
            raise ValidationError('user not found')
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('email', 'username', 'isSuperUser')

