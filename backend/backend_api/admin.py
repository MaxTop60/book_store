from django.contrib import admin
from .models import Book, BooksForm, BookCategory, categoryChoices, BookReview, User

# Register your models here.
class BookAdmin(admin.ModelAdmin):
    form = BooksForm
    list_display = (['title', 'author', 'price'])
    filter_horizontal = ('category',)

admin.site.register(Book, BookAdmin)
admin.site.register(BookReview)
admin.site.register(BookCategory)
admin.site.register(User)