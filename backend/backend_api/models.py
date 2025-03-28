from django.db import models
from django.forms import ModelForm
from django import forms
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.contrib.contenttypes.models import ContentType
import ast


# Create your models here.
categoryChoices = (
    ("books", "Книги"),
    ("el-books", "Электронные книги"),
    ("audio-books", "Аудиокниги"),
    ("toys", "Игрушки, творчество"),
    ("acessories", "Книжные аксессуары"),
    ("notebooks", "Блокноты"),
    ("table-games", "Настольные игры"),
    ("presents", "Подарки"),
    ("stocks", "Акции"),
)

class BookCategory(models.Model):
    name = models.CharField(max_length=100, choices=categoryChoices)

    def __str__(self):
        return self.get_name_display()


class Book(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    price = models.IntegerField()
    img = models.ImageField(upload_to="images/")
    category = models.ManyToManyField(BookCategory, blank=True)
    quantity = models.PositiveIntegerField(default=1)

class User(AbstractUser):
    username = models.CharField(max_length=100, unique=True)
    email = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    groups = models.ManyToManyField(Group, related_name='backend_api_user_set')
    user_permissions = models.ManyToManyField(Permission, related_name='backend_api_user_set', blank=True)
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    def save(self, *args, **kwargs):
        super(User, self).save(*args, **kwargs)
        Basket.objects.get_or_create(userId=self)

class BookReview(models.Model):
    id = models.AutoField(primary_key=True)
    userId = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    bookId = models.ForeignKey(Book, on_delete=models.CASCADE, blank=True, null=True)
    userName = models.CharField(max_length=100)
    mark = models.IntegerField()
    value = models.CharField(max_length=500)


class Basket(models.Model):
    userId = models.ForeignKey(User, on_delete=models.CASCADE, unique=True)
    books = models.ManyToManyField(Book, blank=True)


class AlreadyView(models.Model):
    view_userId = models.ForeignKey(User, on_delete=models.CASCADE, unique=True)
    books = models.ManyToManyField(Book, blank=True)


class BooksForm(ModelForm):
    class Meta:
        model = Book
        fields = "__all__"
        widgets = {
            "category": forms.CheckboxSelectMultiple,
        }
