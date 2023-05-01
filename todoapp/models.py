from django.db import models
from django.contrib.auth.models import User
 
# Create your models here.
class Todoo(models.Model):
    name = models.CharField(max_length=100)
    status = models.BooleanField(default=False)
    edit = models.BooleanField(default=False)
    close = models.CharField(max_length=100,default="none")
    def __str__(self):
        return self.name

    class Meta:
        ordering = ['status']