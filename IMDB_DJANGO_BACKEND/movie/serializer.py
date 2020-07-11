from rest_framework import serializers
from .models import Movie


class MovieCreateUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Movie
        fields = '__all__'


class MovieSerializer(serializers.ModelSerializer):

    genre = serializers.SerializerMethodField('get_genre_list')
    
    class Meta:
        model = Movie
        fields = ['id','popularity','director','genre','imdb_score','name','time_stamp']

    def get_genre_list(self,obj):
        if obj is not None:
            return obj.genre.split(",")
        return None


