from django.shortcuts import render
from .models import Task
from .serializers import TasksSerializer
from rest_framework import viewsets
# Create your views here.

class TasksView(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TasksSerializer