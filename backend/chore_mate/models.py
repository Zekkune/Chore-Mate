from django.db import models

# Create your models here.
class Person(models.Model):
    username = models.CharField(max_length=50, blank=False, null=False)
    password = models.CharField(max_length=50, blank=False, null=False)
    person_id = models.AutoField(primary_key=True)
    parent_user = models.BooleanField(default=False)
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


    

