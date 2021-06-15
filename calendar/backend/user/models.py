from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class UserManager(BaseUserManager):
    use_in_migrations = True
    def create_user(self, username, password, nickname, email):
        user = self.model(username = username, email=email, nickname = nickname)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, username, password):
        if password is None:
            raise TypeError('Superusers must have a password.')
        user = self.create_user(username, password,'', "qwerq123456@snu.ac.kr")
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user

class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=20, unique=True, default=None)
    email = models.CharField(max_length=20, unique=True, null=True, default=None)
    nickname = models.CharField(max_length=20, null=True, default=None)
    password = models.CharField(max_length=20, null=True, default=None)
    firstname = models.CharField(max_length=20, null=True, default=None)
    lastname = models.CharField(max_length=20, null=True, default=None)
    phonenumber = models.CharField(max_length=20, null=True, default=None)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    profile_img = models.ImageField()

    objects = UserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELD = []

    class Meta:
        db_table = 'user'
        ordering = ['-pk']
