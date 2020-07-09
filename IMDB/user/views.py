from django.contrib.auth import logout
from rest_framework.response import Response

# Import restframework views
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView

# importing the rest Decorators
from rest_framework.decorators import api_view, permission_classes

# importing permissions and authentication
from rest_framework.permissions import IsAuthenticated, IsAdminUser

# importing Serializer
from .serializer import RegisterSerializer
from .serializer import CustomTokenObtainPairSerializer, UserSerializer

# importing models
from django.contrib.auth.models import User


# Login to the application - return the JWT token to client side
class Login(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def user_logout(request):
    # if Going for Advanced, we can put the JWT token in blacklist so that it can not be used later
    logout(request)
    return Response({"message": "User has been successfully logout"})


class UserCreation(APIView):

    def post(self, request):
        '''
        data required to post for create the user, need to change only attribute value
        {
            "username":"xyz",
            "password":"xyz",
            "email":"xyz@gmail.com"
        }
        '''
        user_data = request.data
        serializer = RegisterSerializer(data=user_data)
        username = user_data.get('username')
        email = user_data.get('email')
        user = User.objects.filter(username=username).first()
        email_user = User.objects.filter(email=email).first()
        try:
            if user is not None:
                raise Exception(username + " already exist, try with other username!")
            if email_user is not None:
                raise Exception(email + " already registered with us")

            if serializer.is_valid():
                instance = serializer.create(serializer.validated_data)

                if instance is None:
                    return Exception("Some Error Occurred Please try again after sometime")

                user = User.objects.filter(id=instance.id).first()
                serilizer_context = {'request': request}
                serializer = UserSerializer(user, context=serilizer_context)

                return Response(serializer.data, status=201)  # 201 for new User creation
            else:
                raise Exception(serializer.error_messages, status=400)
        except Exception as e:
            return Response({"error": str(e)}, status=400)


@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdminUser])
def getAllUsr(request):
    # Admin can list all the users
    users = User.objects.all()
    serilizer_context = {'request': request}
    serializer = UserSerializer(users, context=serilizer_context, many=True)
    return Response(serializer.data, status=200)


class AdminUserAction(APIView):
    permission_classes = (IsAuthenticated, IsAdminUser)

    def get_object(self, id):
        user = User.objects.filter(id=id).first()
        return user

    def get(self, request, id=None):
        user = self.get_object(id)
        if user is None:
            return Response({"error": "Given user_id - " + str(id) + " user object not found"}, status=404)
        serilizer_context = {'request': request}
        serializer = UserSerializer(user, context=serilizer_context)
        return Response(serializer.data, status=200)

    def put(self, request, id=None):
        '''
        partially data can be updated
        {
            "email":"xyz@gmail.com",
            "first_name":"xyz"
        }
        '''
        if request.data.get("username") is None:
            user = self.get_object(id)
            if user is None:
                return Response({"error": "Given user_id - " + str(id) + " user object not found"}, status=404)
            serilizer_context = {'request': request}
            serializer = UserSerializer(user, data=request.data, partial=True, context=serilizer_context)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=200)
            return Response(serializer.errors, status=400)
        return Response({"error": "User can't update his username"}, status=400)

    def delete(self, request, id=None):
        user = self.get_object(id)
        if user is None:
            return Response({"error": "Given user_id - " + str(id) + " user object not found"}, status=404)
        user.delete()
        return Response(status=200)


class LoggedUserAction(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user
        if user is None:
            return Response({"error": "Given user_id - " + str(id) + " user object not found"}, status=404)
        serilizer_context = {'request': request}
        serializer = UserSerializer(user, context=serilizer_context)
        return Response(serializer.data, status=200)

    def put(self, request):
        '''
        partially data can be updated
        {
            "email":"xyz@gmail.com",
            "first_name":"xyz"
        }
        '''
        if request.data.get("username") is None:
            user = request.user
            if user is None:
                return Response({"error": "Given user_id - " + str(id) + " user object not found"}, status=404)
            serilizer_context = {'request': request}
            serializer = UserSerializer(user, data=request.data, partial=True, context=serilizer_context)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=200)
            return Response(serializer.errors, status=400)
        return Response({"error": "User can't update his username"}, status=400)
