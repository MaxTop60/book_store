from django.db import models
import ast



# Create your models here.
class BookReview(models.Model):
    userId = models.IntegerField()
    userName = models.CharField(max_length=100)
    mark = models.IntegerField()
    value = models.CharField(max_length=500)


class Book(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    price = models.IntegerField()
    img = models.ImageField(upload_to='images/')
    reviews = models.ManyToManyField(BookReview, blank=True)
    
