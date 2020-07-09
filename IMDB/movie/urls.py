from django.conf.urls import url
from . import views


app_name = 'movie'

urlpatterns = [
   url('^api/create_movie/$',views.MovieCreateView.as_view(), name="create_movie"),

]