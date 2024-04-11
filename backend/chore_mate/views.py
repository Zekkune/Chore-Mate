# views.py
from rest_framework import generics
from .serializers import PersonSerializer, ChoreSerializer, MessageSerializer
from .models import Person, Chore, Message
from django.http import JsonResponse
from django.middleware.csrf import get_token

class PersonList(generics.ListCreateAPIView):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer

class PersonDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer

class ChoreList(generics.ListCreateAPIView):
    queryset = Chore.objects.all()
    serializer_class = ChoreSerializer

class ChoreDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Chore.objects.all()
    serializer_class = ChoreSerializer

class MessageList(generics.ListCreateAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

class MessageDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer


