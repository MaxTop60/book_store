from rest_framework import serializers
from .models import Book, BookReview, BookCategory, User, Basket

class BookCategorySerializer(serializers.ModelSerializer):
    class Meta: 
        model = BookCategory
        fields = '__all__'

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ('id', 'title','author','price','img', 'category', 'quantity')

class BookReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookReview
        fields = '__all__'
        extra_kwargs = {
            'bookId': {'required': True},
        }

    def create(self, validated_data):
        return BookReview.objects.create(**validated_data)
    

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email')
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None) 
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
    
class BasketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Basket
        fields = ('userId', 'books')
    
    def create(self, validated_data):
        return Basket.objects.create(**validated_data)
        
