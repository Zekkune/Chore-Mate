from django.contrib import admin
from .models import Person, Chore, Message, User

admin.site.register(Person)
admin.site.register(Chore)
admin.site.register(Message)
admin.site.register(User)