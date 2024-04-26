from django.urls import path
from . import views

urlpatterns = [
    path('register', views.UserRegister.as_view(), name='register'),
    path('login', views.UserLogin.as_view(), name='login'),
    path('logout', views.UserLogout.as_view(), name='logout'),
    path('user', views.UserView.as_view(), name='user'),
    path('add-question', views.AppAddQuestion.as_view(), name='add-question'),
    path('questions', views.AppQuestions.as_view(), name='questions'),
    path('progress', views.UserProgress.as_view(), name='progress'),
    path('check-answer', views.AppCheckAnswer.as_view(), name='check-answer'),
    path('set-background', views.TestBackground.as_view(), name='set-background'),
    path('test-config', views.TestConfig.as_view(), name='test-config'),
]
