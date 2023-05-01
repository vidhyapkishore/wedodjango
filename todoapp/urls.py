# from .views import TodoDelete
from django.urls import path
from todoapp import views
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register('todoapp', views.TodoViewSet, basename='todoapp')



urlpatterns = [
    # path('todoapp',views.TodoViewSet.as_view()), 
    path('todo_details/<int:pk>',views.todo_details,name='todo_detail'),
    path('todo_list',views.todo_list,name='todo_list'),   
    # path('todo',TodoList.as_view(), name='todos'),
    # path('todo/<int:pk>/',TodoDetail.as_view(), name='todo'),
    # path('todo-create',TodoCreate.as_view(), name='todo-create'),
    # path('todo-update/<int:pk>/',TodoUpdate.as_view(), name='todo-update'),
    # path('todo-delete/<int:pk>/',TodoDelete.as_view(), name='todo-delete'),
]

urlpatterns += router.urls