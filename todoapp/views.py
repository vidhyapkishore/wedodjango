# from django.views.generic.list import ListView
# from django.views.generic.detail import DetailView
# from django.views.generic.edit import CreateView, UpdateView,DeleteView
# from django.urls import reverse_lazy
from .models import Todoo
from .serializers import TodoSerializer
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.decorators import api_view 
from rest_framework import status
from rest_framework import viewsets

# Create your views here. 
class TodoViewSet(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todoo.objects.all()


@api_view(['GET', 'PUT', 'DELETE','PATCH'])
def todo_details(request, pk):
    try:
        todo=Todoo.objects.filter(id=pk)[0]
    except todo.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = TodoSerializer(todo, many= True)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = TodoSerializer(todo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        todo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    elif request.method == 'PATCH':
        serializer =TodoSerializer (todo, data = request.data, partial=True)  
        if serializer.is_valid():  
            serializer.save()  
            return Response({ "status": "success", "data": serializer.data})  
        else:  
            return Response({ "status": "error", "data": serializer.errors})  








@api_view(['GET','POST'])
def todo_list(request):
    if request.method == 'GET':
        todoo_list=Todoo.objects.all()
        serializer = TodoSerializer(todoo_list, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = TodoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


























# class TodoList(ListView):
#     model = Todoo
#     context_object_name = 'todos'

# class TodoDetail(DetailView):
#     model = Todoo
#     context_object_name = 'todo'
#     # template_name = 'todoapp/task.html'

# class TodoCreate(CreateView):
#     model = Todoo
#     fields = '__all__'
#     success_url = reverse_lazy('todos')

# class TodoUpdate(UpdateView):
#     model = Todoo
#     fields = '__all__'
#     success_url = reverse_lazy('todos')


# class TodoDelete(DeleteView):
#     model = Todoo
#     context_object_name = 'todos'    
#     success_url = reverse_lazy('http://localhost:3000/')
    