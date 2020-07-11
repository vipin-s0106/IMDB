from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers

from django.contrib.auth.models import User



class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)

        refresh = self.get_token(self.user)

        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)

        data['username'] = str(self.user.username)

        return data


class RegisterSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = [
            'email',
            'username',
            'password',
        ]

    def create(self, validated_data):
        password = validated_data.get('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        exclude = ("password","groups","user_permissions")
        

