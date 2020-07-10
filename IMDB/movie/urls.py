from django.conf.urls import url
from . import views


app_name = 'movie'

urlpatterns = [
   url('^api/movie/create/$',views.MovieCreateView.as_view(), name="create_movie"),
   url('^api/movie/list/$',views.MovieListView.as_view(), name="list_movie"),
   url('^api/get_movie/(?P<id>[0-9]+)/$',views.getMovie, name="get_movie"),
   url('^api/movies/(?P<id>[0-9]+)/$',views.MovieView.as_view(), name="movie_update_delete"),
]