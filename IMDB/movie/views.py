from rest_framework.response import Response
from rest_framework.views import APIView

from .serializer import MovieSerializer
from rest_framework.parsers import JSONParser
from rest_framework.parsers import MultiPartParser

from rest_framework.permissions import IsAdminUser,IsAuthenticated

# Create your views here.

class MovieCreateView(APIView):
    parser_classes = (MultiPartParser, JSONParser)
    permission_classes = (IsAuthenticated,IsAdminUser)

    def post(self, request):
        post_data = request.data
        serializer = MovieSerializer(data=post_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        else:
            return Response(serializer.error_messages, status=400)
