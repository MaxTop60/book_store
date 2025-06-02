from rest_framework import serializers
from django.conf import settings
from .models import Book, BookReview, BookCategory, User, Basket, Group, Permission, AlreadyView, Order, Favourites

class AbsoluteURLImageField(serializers.ImageField):
    def to_representation(self, value):
        if not value:
            return None
        return f"{settings.MEDIA_URL}{value.name}"

class BookCategorySerializer(serializers.ModelSerializer):
    class Meta: 
        model = BookCategory
        fields = '__all__'

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['name'] = instance.get_name_display()
        return ret

class BookSerializer(serializers.ModelSerializer):
    category = BookCategorySerializer(many=True, required=False)
    image = AbsoluteURLImageField()
    
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


class OrderSerializer(serializers.ModelSerializer):
    book = BookSerializer()
    userId = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Order
        fields = ('id', 'userId', 'book', 'is_ordered', 'status')


class FavouritesSerializer(serializers.ModelSerializer):
    books = BookSerializer(many=True)

    class Meta:
        model = Favourites
        fields = ('userId', 'books')


class UserSerializer(serializers.ModelSerializer):
    groups = GroupSerializer(many=True)
    orders = serializers.SerializerMethodField()
    favourites = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'email', 'groups', 'username', 'orders', 'favourites')
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': False},
        }

    def get_orders(self, obj):
        orders = Order.objects.filter(userId=obj)
        return OrderSerializer(orders, many=True).data

    def get_favourites(self, obj):
        favourites, created = Favourites.objects.get_or_create(userId=obj)
        return FavouritesSerializer(favourites).data


    def create(self, validated_data):
        password = validated_data.pop('password', None)
        groups_data = validated_data.pop('groups', [])

        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()

        for group_data in groups_data:
            try:
                group = Group.objects.get(name=group_data['name'])
            except Group.DoesNotExist:
                group = Group.objects.create(name=group_data['name'])
            permissions = group_data.get('permissions', [])
            for permission_name in permissions:
                permission, created = Permission.objects.get_or_create(name=permission_name)
                group.permissions.add(permission)
            group.save() 

        return instance
    
    def update(self, instance, validated_data):
        groups_data = validated_data.pop('groups', [])
        instance.email = validated_data.get('email', instance.email)
        instance.username = validated_data.get('username', instance.username)
        password = validated_data.pop('password', None)
        if password is not None:
            instance.set_password(password)
        instance.save()

        instance.groups.clear()
        for group_data in groups_data:
            try:
                group = Group.objects.get(name=group_data['name'])
            except Group.DoesNotExist:
                group = Group.objects.create(name=group_data['name'])
            permissions = group_data.get('permissions', [])
            for permission_name in permissions:
                permission, created = Permission.objects.get_or_create(name=permission_name)
                group.permissions.add(permission)
            group.save()
            instance.groups.add(group)

        return instance


    
class BasketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Basket
        fields = ('userId', 'books')
    
    def create(self, validated_data):
        return Basket.objects.create(**validated_data)
        

class AlreadyViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = AlreadyView
        fields = ('view_userId', 'books')

    def create(self, validated_data):
        return Basket.objects.create(**validated_data)
        
