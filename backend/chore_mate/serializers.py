from rest_framework import serializers
from .models import Person, Chore, Message

class MessageSerializer(serializers.HyperlinkedModelSerializer):
    sender = serializers.PrimaryKeyRelatedField(
        queryset = Person.objects.all(),
        source = 'sender_id'
    )
    person = serializers.ReadOnlyField(source='sender_name.first_name')

    class Meta:
        model = Message
        fields = ('message_id', 'sender', 'person', 'message')

class ChoreSerializer(serializers.HyperlinkedModelSerializer):
    assigned_to = serializers.ReadOnlyField(source='assigned_to.first_name')
        
    class Meta:
        model = Chore
        fields = ('id', 'assigned_to', 'chore_name', 'chore_description', 'chore_completed', 'chore_icon')

class PersonSerializer(serializers.HyperlinkedModelSerializer):
    chores = ChoreSerializer(
        many = True,
        read_only = True
    )
    messages = MessageSerializer(
        many = True, 
        read_only = True
    )
    
    class Meta:
        model = Person
        fields = ('person_id', 'first_name', 'last_name', 'age', 'chores', 'messages', 'profile_img')