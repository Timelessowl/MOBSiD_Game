from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
import environ


env = environ.Env()
environ.Env.read_env()


class AppQuizManager(models.Manager):

    def add_question(self, text, ans):
        question = self.model(text=text, answer=ans)
        question.save()
        return question


class AppUserManager(BaseUserManager):
    def create_user(self, email, password=None):
        if not email:
            raise ValueError('An email is required.')
        if not password:
            raise ValueError('A password is required.')
        email = self.normalize_email(email)
        user = self.model(email=email)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password=None, adminkey=None):
        if not email:
            raise ValueError('An email is required.')
        if not password:
            raise ValueError('A password is required.')
        if adminkey != env('ADMIN_KEY'):
            raise ValueError('Incorrect administrator key')
        user = self.create_user(email, password)
        user.isSuperUser = True
        user.save()
        return user




class AppUser(AbstractBaseUser, PermissionsMixin):
    user_id = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=50, unique=True)
    username = models.CharField(max_length=50)
    isSuperUser = models.BooleanField(default=False)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    objects = AppUserManager()

    def __str__(self):
        return self.username


class QuestionModel(models.Model):
    text = models.CharField(max_length=200, null=True)
    op1 = models.CharField(max_length=200, null=True)
    op2 = models.CharField(max_length=200, null=True)
    op3 = models.CharField(max_length=200, null=True)
    op4 = models.CharField(max_length=200, null=True)
    op5 = models.CharField(max_length=200, null=True)
    answer = models.CharField(max_length=200, null=True)
    objects = AppQuizManager()
    def __str__(self):
        return self.text


class UsersProgress(models.Model):
    user_id = models.OneToOneField(
        AppUser,
        on_delete=models.CASCADE,
        primary_key=True,
    )
    position = models.IntegerField(default=0)
    progress = models.JSONField()
    objects = models.Manager()

    def __str__(self):
        return self.user_id
