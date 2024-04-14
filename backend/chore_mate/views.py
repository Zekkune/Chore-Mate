# views.py
from rest_framework import generics
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import permission_classes
from django.utils.decorators import method_decorator 
from .serializers import PersonSerializer, ChoreSerializer, MessageSerializer
from .models import Person, Chore, Message
from django.http import JsonResponse
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from django.middleware.csrf import get_token
from .forms import PersonForm
import json

def get_csrf_token(request):
    token = get_token(request)
    return JsonResponse({'csrfToken': token})

@csrf_exempt
def create_person(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        form = PersonForm(data)
        if form.is_valid():
            form.save()
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'error': 'Invalid data'}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def update_person(request, person_id):
    try:
        person = Person.objects.get(pk=person_id)
    except Person.DoesNotExist:
        return JsonResponse({'error': 'Person not found'}, status=404)
    
    if request.method == 'PUT':
        data = json.loads(request.body)
        form = PersonForm(data, instance=person)
        if form.is_valid():
            form.save()
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'error': 'Invalid data'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def delete_person(request, person_id):
    try:
        person = Person.objects.get(pk=person_id)
    except Person.DoesNotExist:
        return JsonResponse({'error': 'Person not found'}, status=404)
    
    if request.method == 'DELETE':
        person.delete()
        return JsonResponse({'success': True})
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)
    
class PersonList(generics.ListCreateAPIView):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer
    authentication_classes = []
    permission_classes = [AllowAny]

class PersonDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer
    authentication_classes = []
    permission_classes = [AllowAny]

class ChoreList(generics.ListCreateAPIView):
    queryset = Chore.objects.all()
    serializer_class = ChoreSerializer
    authentication_classes = []
    permission_classes = [AllowAny]

class ChoreDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Chore.objects.all()
    serializer_class = ChoreSerializer
    authentication_classes = []
    permission_classes = [AllowAny]

class MessageList(generics.ListCreateAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    authentication_classes = []
    permission_classes = [AllowAny]

class MessageDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    authentication_classes = []
    permission_classes = [AllowAny]


