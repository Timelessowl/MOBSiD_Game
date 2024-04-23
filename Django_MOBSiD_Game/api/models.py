from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
import environ


env = environ.Env()
environ.Env.read_env()


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
    position = models.IntegerField(default=0)
    progress = models.JSONField(default='')
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    objects = AppUserManager()

    def __str__(self):
        return self.username


class TestModel(models.Model):
    test_id = models.AutoField(primary_key=True)
    background = models.ImageField(default='')
    path = models.JSONField()

    def __str__(self):
        return self.test_id


class QuestionModel(models.Model):
    test_id = models.ForeignKey(TestModel, on_delete=models.CASCADE, default=1)
    text = models.CharField(max_length=200, null=True)
    withOptions = models.BooleanField(default=False)
    opt1 = models.CharField(max_length=200, null=True, blank=True)
    opt2 = models.CharField(max_length=200, null=True, blank=True)
    opt3 = models.CharField(max_length=200, null=True, blank=True)
    opt4 = models.CharField(max_length=200, null=True, blank=True)
    opt5 = models.CharField(max_length=200, null=True, blank=True)
    answer = models.CharField(max_length=200, default=' ')
    objects = models.Manager()
    def __str__(self):
        return self.text

