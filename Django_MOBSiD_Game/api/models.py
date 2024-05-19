import environ
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from datetime import tzinfo, timedelta, datetime, date

env = environ.Env()
environ.Env.read_env()


class AppUserManager(BaseUserManager):
    def create_user(self, email, password=None):
        if not email:
            raise ValueError("An email is required.")
        if not password:
            raise ValueError("A password is required.")
        email = self.normalize_email(email)
        user = self.model(email=email)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password=None, adminkey=None):
        if not email:
            raise ValueError("An email is required.")
        if not password:
            raise ValueError("A password is required.")
        if adminkey != env("ADMIN_KEY"):
            raise ValueError("Incorrect administrator key")
        user = self.create_user(email, password)
        user.isSuperUser = True
        user.save()
        return user


class AppUser(AbstractBaseUser, PermissionsMixin):
    user_id = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=50, unique=True)
    username = models.CharField(max_length=50, unique=True)
    isSuperUser = models.BooleanField(default=False)
    avatar = models.ImageField(upload_to="users_avatars", default="")
    position = models.IntegerField(default=0)
    progress = models.JSONField(default="")
    activeTestId = models.IntegerField(default=None, null=True, blank=True)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]
    objects = AppUserManager()

    def __str__(self):
        return self.username


class TestModel(models.Model):
    testId = models.AutoField(primary_key=True)
    title = models.CharField(max_length=50, default="Test")
    background = models.ImageField(upload_to="uploads")
    path = models.JSONField()
    timer = models.DateTimeField(default=datetime.now)
    currentQuestion = models.IntegerField(default=1)

    objects = models.Manager()

    def __str__(self):
        return self.testId


class QuestionModel(models.Model):
    testId = models.ForeignKey(TestModel, on_delete=models.CASCADE)
    text = models.CharField(max_length=200, null=True)
    withOptions = models.BooleanField(default=False)
    timer = models.TimeField(default="00:10:00")
    opt1 = models.CharField(max_length=200, null=True, blank=True)
    opt2 = models.CharField(max_length=200, null=True, blank=True)
    opt3 = models.CharField(max_length=200, null=True, blank=True)
    opt4 = models.CharField(max_length=200, null=True, blank=True)
    opt5 = models.CharField(max_length=200, null=True, blank=True)
    answer = models.CharField(max_length=200, default=" ")
    objects = models.Manager()

    def __str__(self):
        return self.text
