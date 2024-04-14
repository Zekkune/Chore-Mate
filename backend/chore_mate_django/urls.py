from django.conf.urls import include
from django.urls import path, include, re_path
from django.contrib import admin
from django.views.generic import TemplateView
from chore_mate import views
from chore_mate.views import get_csrf_token, create_person, delete_person, update_person
from django.views.decorators.csrf import csrf_exempt


urlpatterns = [
    path('api/csrf/', get_csrf_token, name='get_csrf_token'),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('admin/', admin.site.urls),
    path('api-auth', include('rest_framework.urls', namespace='rest_framework')),
    path('people/', views.PersonList.as_view(), name='person_list'),
    path('people/<int:pk>', views.PersonDetail.as_view(), name='person_detail'),
    path('chores/', views.ChoreList.as_view(), name='chore_list'),
    path('chores/<int:pk>', views.ChoreDetail.as_view(), name='chore_detail'),
    path('messages/', views.MessageList.as_view(), name='message_list'),
    path('messages/<int:pk>', views.MessageDetail.as_view(), name='message_detail'),
    path('api/create_person/', create_person, name='create_person'),
    path('api/delete_person/<int:person_id>', csrf_exempt(delete_person), name='delete_person'),
    path('api/update_person/<int:person_id>', update_person, name='update_person'),
    # path('api/create_chore/', create_chore, name='create_data'),
    # path('api/message/', message_person, name='create_data'),
    ]

urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]


