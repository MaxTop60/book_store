from django.contrib import admin
from django.contrib.auth.models import Group, Permission
from .models import Book, BooksForm, BookCategory, categoryChoices, BookReview, User, Basket, AlreadyView

# Register your models here.
class BookAdmin(admin.ModelAdmin):
    form = BooksForm
    list_display = (['title', 'author', 'price'])
    filter_horizontal = ('category',)

admin.site.register(Book, BookAdmin)
admin.site.register(BookReview)
admin.site.register(BookCategory)
admin.site.register(User)
admin.site.register(Basket)
admin.site.register(AlreadyView)