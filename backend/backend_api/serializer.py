from rest_framework import serializers
from .models import Book
from .models import BookReview

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ('id','title','author','price','img', 'reviews')

class BookReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookReview
        fields = ('userId','userName','mark','value')


