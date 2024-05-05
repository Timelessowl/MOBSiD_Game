from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from rest_framework.exceptions import ValidationError
from .models import *
import json

UserModel = get_user_model()


class AppQuestionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionModel
        fields = '__all__'

    def add_new(self, data):
        test_obj = TestModel.objects.get(testId=data['testId'])
        question_object = QuestionModel(
            testId=test_obj,
            text=data['text'],
            withOptions=data['withOptions'],
            answer=data['answer'],
            opt1=data['opt1'],
            opt2=data['opt2'],
            opt3=data['opt3'],
            opt4=data['opt4'],
            opt5=data['opt5'],
        )
        question_object.save()
        return question_object

    def checkAnswer(self, user_data, ques_data):
        question_obj = QuestionModel.objects.get(id=ques_data['id'])
        user_obj = UserModel.objects.get(email=user_data.email)
        if user_obj.progress != "":
            progress = dict(json.loads(user_obj.progress))
            if str(ques_data['id']) not in progress:
                progress.update({str(ques_data['id']): [0, 0]})
        else:
            progress = {str(ques_data['id']): [0, 0]}
        if not (progress[str(ques_data['id'])][0]):

            progress[str(ques_data['id'])][1] += 1
            if question_obj.answer == ques_data['answer']:
                user_obj.position += 1
                progress[str(ques_data['id'])][0] = 1

            user_obj.progress = json.dumps(progress)
            user_obj.save()

        return [user_obj.position, user_obj.progress]


class UserProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('position', 'progress')

    def reset_progress(self):
        pass

    def get_progress(self, user_data):
        user_obj = UserModel.objects.get(email=user_data.email)
        return {'position': user_obj.position, 'progress': user_obj.progress}


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


class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestModel
        fields = '__all__'

    def addNew(self, data):
        test_obj = TestModel(title=data['title'], path=data['path'], background=data['background'])
        test_obj.save()
        return test_obj

    def setBackground(self, data):
        test_obj = TestModel.objects.get(testId=data['testId'])
        test_obj.background = data['background']
        test_obj.save()
        return {'testId': test_obj.testId}

    def addToPath(self, data):
        test_obj = TestModel.objects.get(testId=data['testId'])
        if test_obj.path != "":
            path = dict(json.loads(test_obj.path))
            path.update({max(int(i) for i in path.keys())+1: data['path']})
        else:
            path = {1: data['path']}

        test_obj.path = json.dumps(path)
        test_obj.save()
        return test_obj.path

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('email', 'username', 'isSuperUser')

