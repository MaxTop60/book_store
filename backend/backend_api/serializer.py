from rest_framework import serializers
from .models import Book, BookReview, BookCategory, User, Basket, Group, Permission, AlreadyView

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
            'email': {'required': False},
        }

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
        