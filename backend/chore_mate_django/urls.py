from django.conf.urls import include
from django.urls import path
from django.contrib import admin
from chore_mate import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth', include('rest_framework.urls', namespace='rest_framework')),
    path('people/', views.PersonList.as_view(), name='person_list'),
    path('people/<int:pk>', views.PersonDetail.as_view(), name='person_detail'),
    path('chores/', views.ChoreList.as_view(), name='chore_list'),
    path('chores/<int:pk>', views.ChoreDetail.as_view(), name='chore_detail'),
    path('messages/', views.MessageList.as_view(), name='message_list'),
    path('messages/<int:pk>', views.MessageDetail.as_view(), name='message_detail'),
    ]