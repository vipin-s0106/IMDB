from rest_framework.response import Response
from rest_framework.views import APIView
from django.conf import settings

#import serializer
from .serializer import MovieSerializer,MovieCreateUpdateSerializer

#importing all required package/class from rest_framework
from rest_framework.parsers import JSONParser
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import IsAdminUser,IsAuthenticated
from rest_framework import generics
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.decorators import api_view,permission_classes

#import Models
from .models import Movie


class MovieCreateView(APIView):
    parser_classes = (MultiPartParser, JSONParser)
    #Only Authenticated Admin can create the moive
    permission_classes = (IsAuthenticated,IsAdminUser)

    def post(self, request):
        '''
        {
            "popularity": 83.0,
            "director": "Victor Fleming",
            "genre": [
            "Adventure",
            " Family",
            " Fantasy",
            " Musical"
            ],
            "imdb_score": 8.3,
            "name": "The Wizard of Oz"
        }
        '''
        post_data = request.data

        #below coded for to manage the single creation of movie and multiple movie creation
        if not (isinstance(post_data,list)):
            post_data = [post_data]

        # Parsing the genre given in Array to String separated by , but during the get movies it will appears as in Array form no need to parsing
        for data in post_data:
            if(isinstance(data.get('genre'),list)):
                data['genre'] = ",".join(data['genre'])
            else:
                Response({"error":"Genre Not provided with required format array"},status=400)

        serializer = MovieCreateUpdateSerializer(data=post_data,many=True)

        if serializer.is_valid():
            serializer.save()
            serilizer_context = {'request': request}
            #getting id of instance generated
            list_id = list(map(lambda x:x.get('id'),serializer.data))

            #Handling the serilization based on Multiple instance and single instance
            if len(list_id) > 1:
                serializer = MovieSerializer(Movie.objects.filter(id__in=list_id),many=True,context=serilizer_context)
            else:
                serializer = MovieSerializer(Movie.objects.get(id=list_id[0]),context=serilizer_context)
            
            return Response(serializer.data, status=201)
        else:
            return Response(serializer.error_messages, status=400)
        

class MovieListView(generics.ListAPIView):
    
    # All Authenticated/UnAuthenticated User can see the Movie List
    #get the latest one first
    queryset = Movie.objects.all().order_by('-time_stamp')
    serializer_class = MovieSerializer
    pagination_class = LimitOffsetPagination
    


@api_view(['GET'])
@permission_classes([])
def getMovie(request,id):
    # All can see the single Movie Object
    movie = Movie.objects.filter(id=id).first()
    if movie is None:
            return Response({"error": "Given movie_id - " + str(id) + " movie object not found"}, status=404) 
    serializer = MovieSerializer(movie)
    serilizer_context = {'request': request}
    return Response(serializer.data, status=200)



class MovieView(APIView):
    #All Authenticated/UnAuthenticated User can see the Movie List
    permission_classes = (IsAuthenticated, IsAdminUser)

    def get_object(self, id):
        movie = Movie.objects.filter(id=id).first()
        return movie

    def put(self, request, id=None):
        '''
        partially data can be updated
        {
            "name":"Test",
            "genre":[
                "Fun",
                "Drama"
            ]
        }
        '''
        put_data = request.data
        #get the Object
        movie = self.get_object(id)
        if movie is None:
            return Response({"error": "Given movie_id - " + str(id) + " movie object not found"}, status=404)

        #serilization of genre Array into , seprated String
        if put_data.get("genre") is not None:
            if(isinstance(put_data.get('genre'),list)):
                put_data['genre'] = ",".join(put_data['genre'])
            else:
                Response({"error":"Genre Not provided with required format array"},status=400)

        serilizer_context = {'request': request}
        serializer = MovieCreateUpdateSerializer(movie, data=put_data, partial=True, context=serilizer_context)
        if serializer.is_valid():
            serializer.save()
            serializer = MovieSerializer(Movie.objects.get(id=id))
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)
        

    def delete(self, request, id=None):
        movie = self.get_object(id)
        if movie is None:
            return Response({"error": "Given movie_id - " + str(id) + " movie object not found"}, status=404)
        movie.delete()
        return Response(status=200)

        
