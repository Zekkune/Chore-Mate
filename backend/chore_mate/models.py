from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

# Create your models here.

class UserAccountManager(BaseUserManager):
    def create_user(self, email, username, password=None):
        if not email:
            raise ValueError('Users Need an Email to Continue')
        
        email = self.normalize_email(email)
        user = self.model(email=email, username=username)

        user.set_password(password)
        user.save()

        return user

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    username = models.CharField(max_length=100, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    def get_full_name(self):
        return self.username
    
    def get_short_name(self):
        return self.username
    
    def __str__(self):
        return self.username


class Person(models.Model):
    person_id = models.AutoField(primary_key=True)
    is_parent = models.BooleanField(default=False, blank=False, null=False)
    profile_img = models.TextField(blank=True)
    first_name = models.CharField(max_length=100, blank=False, null=False)
    last_name = models.CharField(max_length=100, blank=False, null=False)
    age = models.PositiveIntegerField()

    def __str__(self):
        return self.first_name
    
class Chore(models.Model):
    assigned_to = models.ForeignKey(Person, on_delete=models.CASCADE, related_name='people')
    chore_name = models.CharField(max_length=50, blank=False, null=False)
    chore_description = models.TextField()
    chore_completed = models.BooleanField(default=False)
    chore_icon = models.TextField(blank=True)

    def __str__(self):
        return self.chore_name

class Message(models.Model):
    message_id = models.AutoField(primary_key=True)
    sender_id = models.ForeignKey(Person, on_delete=models.CASCADE, related_name='messages')
    sender_name = models.ForeignKey(Person, on_delete=models.CASCADE, related_name='sender')
    message = models.CharField(max_length=500)

    def __str__(self):
        return f"Message {self.message_id} from {self.sender_name}"


    

