import base64
from urllib.parse import unquote

from django.contrib.auth import login, logout
from rest_framework import permissions, status
from rest_framework.authentication import SessionAuthentication
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import *
from .serializers import *
from .validations import custom_validation, validate_email, validate_password
from .consumers import ProgressBarConsumer

consumer = ProgressBarConsumer


class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        clean_data = custom_validation(request.data)
        serializer = UserRegisterSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(clean_data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)

    ##
    def post(self, request):
        data = request.data
        assert validate_email(data)
        assert validate_password(data)
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)
            login(request, user)
            return Response(serializer.data, status=status.HTTP_200_OK)


class UserLogout(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)


class UserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    ##
    def get(self, request):
        serializer = UserSerializer(request.user)
        data = serializer.data
        with open(unquote(data["avatar"]).strip("/"), "rb") as image_file:
            data["avatar"] = base64.b64encode(image_file.read())
        return Response(data, status=status.HTTP_200_OK)


class UsersView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    ##
    def post(self, request):
        serializer = UserSerializer(
            AppUser.objects.filter(activeTestId=request.data["testId"]), many=True
        )
        data = serializer.data
        for i in data:
            if i["avatar"] is not None:
                with open(unquote(i["avatar"]).strip("/"), "rb") as image_file:
                    i["avatar"] = base64.b64encode(image_file.read())
        return Response(data, status=status.HTTP_200_OK)


class UserSetActiveTest(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        serializer = UserActiveTestSerializer(request.user)
        return Response(
            serializer.set(request.user, request.data), status=status.HTTP_200_OK
        )


class AppAddQuestion(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        serializer = AppQuestionsSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.add_new(serializer.data)
            return Response(serializer.data, status=status.HTTP_200_OK)


class AppQuestions(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        serializer = AppQuestionsSerializer(
            QuestionModel.objects.filter(testId=request.data["testId"]), many=True
        )
        for i in serializer.data:
            i["answer"] = ""
        return Response(serializer.data, status=status.HTTP_200_OK)


class AppAddToPath(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        serializer = TestSerializer(
            TestModel.objects.get(testId=request.data["testId"])
        )
        serializer.addToPath(request.data)
        return Response(serializer.data["path"], status=status.HTTP_200_OK)


class AppCheckAnswer(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        serializer = AppQuestionsSerializer(data=request.data)
        return Response(
            serializer.checkAnswer(user_data=request.user, ques_data=request.data),
            status=status.HTTP_200_OK,
        )


class UserProgress(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        serializer = UserProgressSerializer(request.user)
        return Response(
            serializer.get_progress(user_data=request.user), status=status.HTTP_200_OK
        )


class UsersPosition(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        serializer = UserProgressSerializer(request.user)
        return Response(
            serializer.get_position(data=request.data), status=status.HTTP_200_OK
        )


class TestBackground(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        serializer = TestSerializer(request.data)
        return Response(
            serializer.setBackground(data=request.data), status=status.HTTP_200_OK
        )


class AppTests(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def get(self, request):
        serializer = TestSerializer(TestModel.objects.all(), many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AppAddTest(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        serializer = TestSerializer(request.data)
        return Response(serializer.addNew(data=request.data), status=status.HTTP_200_OK)


class AppSetTimer(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    # permission_classes = (permissions.IsAuthenticated,)
    # authentication_classes = (SessionAuthentication,)

    def post(self, request):
        serializer = TimerSerializer()
        return Response(
            serializer.setTimer(data=request.data), status=status.HTTP_200_OK
        )


class AppGetTimer(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        serializer = TimerSerializer()
        return Response(
            serializer.getTimer(data=request.data), status=status.HTTP_200_OK
        )


class TestSetQuestion(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    # permission_classes = (permissions.IsAuthenticated,)
    # authentication_classes = (SessionAuthentication,)

    def post(self, request):
        serializer = TestSerializer()
        return Response(
            serializer.setQuestion(data=request.data), status=status.HTTP_200_OK
        )


class TestGetQuestion(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        serializer = TestSerializer()
        return Response(
            serializer.getQuestion(data=request.data), status=status.HTTP_200_OK
        )


class TestConfig(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):

        serializer = TestSerializer(
            TestModel.objects.get(testId=request.data["testId"])
        )

        data = serializer.data
        with open((unquote(data["background"])).strip("/"), "rb") as image_file:
            data["background"] = base64.b64encode(image_file.read())
        return Response(data=data)
