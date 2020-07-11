from django.urls import path
from django.conf.urls import url
from . import views
from rest_framework_simplejwt import views as jwt_views

app_name = 'user'

urlpatterns = [
   url('^api/login/$',views.Login.as_view() , name="api_login"),
   url('^api/token/refresh/$',jwt_views.TokenRefreshView.as_view(), name='refresh_token'),
   url('^api/logout/$',views.user_logout,name='api_logout'),
   url('^api/register/$',views.UserCreation.as_view(),name='api_user_register'),
   url('^api/users/$',views.getAllUsr,name="getAllUsers"), # admin can perform this action
   url('^api/users/(?P<id>[0-9]+)/$',views.AdminUserAction.as_view(),name='api_admin_user_action'), # admin can perform this action
   url('^api/logged_user/$',views.LoggedUserAction.as_view(),name='api_logged_user_action'), #logged user can see access this api for his detai
]
