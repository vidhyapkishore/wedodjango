from rest_framework import serializers
from .models import Todoo

 
class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todoo
        fields = '__all__' 