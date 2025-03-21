from rest_framework import serializers
from .models import Book, BookReview, BookCategory, User, Basket, Group, Permission

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
    
class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('name', 'permissions')
    

class UserSerializer(serializers.ModelSerializer):
    groups = GroupSerializer(many=True)

    class Meta:
        model = User
        fields = ('id', 'email', 'groups', 'username')
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        groups_data = validated_data.pop('groups', [])

        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()

        for group_data in groups_data:
            group, created = Group.objects.get_or_create(name=group_data['name'])
            permissions = group_data.get('permissions', [])
            for permission_name in permissions:
                permission, created = Permission.objects.get_or_create(name=permission_name)
                group.permissions.add(permission)

        return instance
    
class BasketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Basket
        fields = ('userId', 'books')
    
    def create(self, validated_data):
        return Basket.objects.create(**validated_data)
        
