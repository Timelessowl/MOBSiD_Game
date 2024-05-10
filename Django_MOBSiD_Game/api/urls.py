from django.urls import path
from . import views

urlpatterns = [
    path('register', views.UserRegister.as_view(), name='register'),
    path('login', views.UserLogin.as_view(), name='login'),
    path('logout', views.UserLogout.as_view(), name='logout'),
    path('user', views.UserView.as_view(), name='user'),
    path('users-data', views.UsersView.as_view(), name='users-data'),
    path('set-active-test', views.UserSetActiveTest.as_view(), name='set-active-test'),
    path('add-question', views.AppAddQuestion.as_view(), name='add-question'),
    path('add-test', views.AppAddTest.as_view(), name='add-test'),
    path('questions', views.AppQuestions.as_view(), name='questions'),
    path('progress', views.UserProgress.as_view(), name='progress'),
    path('positions', views.UsersPosition.as_view(), name='positions'),
    path('check-answer', views.AppCheckAnswer.as_view(), name='check-answer'),
    path('set-background', views.TestBackground.as_view(), name='set-background'),
    path('set-test-path', views.AppAddToPath.as_view(), name='set-test-path'),
    path('test-config', views.TestConfig.as_view(), name='test-config'),
    path('tests', views.AppTests.as_view(), name='tests'),
]
