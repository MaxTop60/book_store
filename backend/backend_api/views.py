from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Book, BookReview, Basket, User, BookCategory, Group, Permission, AlreadyView
from .serializer import BookSerializer, BookReviewSerializer, UserSerializer, BasketSerializer, BookCategorySerializer, AlreadyViewSerializer
from rest_framework import viewsets, status, authentication

from django.core.files.base import File
from django.contrib.contenttypes.models import ContentType


# Create your views here.
class BookView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        output = [
            {
                "id": output.id,
                "title": output.title,
                "author": output.author,
                "price": output.price,
                "img": f"http://127.0.0.1:8000{output.img.url}",
                "category": [category.name for category in output.category.all()],
            }
            for output in Book.objects.all()
        ]
        return Response(output)

    def post(self, request):
        serializer = BookSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            book = serializer.save()
            book.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request):
        book = Book.objects.get(id=request.data['id'])
        book.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request):
        book = Book.objects.get(id=request.data['id'])
        data = request.data.copy()
        if 'img' in data and not data['img']:
            data['img'] = book.img
        elif 'img' in data and not isinstance(data['img'], File):
            del data['img']
        elif not ('img' in data):
            data['img'] = book.img
        serializer = BookSerializer(book, data=data)
        if serializer.is_valid(raise_exception=True):
            book = serializer.save()
            book.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)






class BookReviewView(APIView):
    permission_classes = (AllowAny, )

    def get(self, request):
        book_reviews = BookReview.objects.all()
        serializer = BookReviewSerializer(book_reviews, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = BookReviewSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
    
    def delete(self, request):
        review = BookReview.objects.get(id=request.data['id'])
        review.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        

class BasketView(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (JWTAuthentication,)

    def get(self, request):
        userId = request.GET.get('userId')
        user = User.objects.get(id=userId)
        basket = Basket.objects.filter(userId=user).first()
        if basket is None:
            return Response({"error": "Basket does not exist"}, status=status.HTTP_404_NOT_FOUND)
        books = basket.books.all()
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = BasketSerializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            user_id = serializer.data['userId']
            book_id = request.data['bookId']
            user = User.objects.get(id=user_id)
            book = Book.objects.get(id=book_id)
            basket = Basket.objects.filter(userId=user).first()
            if basket is None:
                basket = Basket.objects.create(userId=user)
            if book in basket.books.all():
                book.quantity += 1
            book.save()
            basket.books.add(book)
            basket.save()
            return Response(BasketSerializer(basket).data, status=status.HTTP_201_CREATED)

    def delete(self, request):
        user = request.user
        book_id = request.data['bookId']
        book = Book.objects.get(id=book_id)
        baskets = Basket.objects.filter(userId=user)
        for basket in baskets:
            if book in basket.books.all() and book.quantity > 1:
                book.quantity -= 1
                book.save()
                basket.save()
            elif book in basket.books.all() and book.quantity == 1:
                basket.books.remove(book)
                basket.save()
        return Response(BasketSerializer(basket).data, status=status.HTTP_204_NO_CONTENT)
    
    def put(self, request):
        user = request.user
        book_id = request.data['bookId']
        book = Book.objects.get(id=book_id)
        baskets = Basket.objects.filter(userId=user)
        for basket in baskets:
            if book in basket.books.all():
                book.quantity += 1
            else:
                book.quantity = 1
            book.save()
            basket.books.add(book)
            basket.save()
        return Response(BasketSerializer(basket).data, status=status.HTTP_200_OK)


class AlreadyViewView(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (JWTAuthentication,)

    def get(self, request):
        userId = request.GET.get('views_userId')
        try:
            user = User.objects.get(id=userId)
        except User.DoesNotExist:
            return Response({"error": "User does not exist"}, status=status.HTTP_404_NOT_FOUND)
        already_view = AlreadyView.objects.filter(view_userId=user).first()
        if already_view is None:
            return Response({"error": "AlreadyView does not exist"}, status=status.HTTP_404_NOT_FOUND)
        books = already_view.books.all()
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = AlreadyViewSerializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            user_id = serializer.validated_data['view_userId']
            book_id = request.data['bookId']
            user = User.objects.get(id=user_id.id)  # Используйте user_id.id вместо user_id
            book = Book.objects.get(id=book_id)
            already_view, created = AlreadyView.objects.get_or_create(view_userId=user)  # Используйте user вместо user.id
            if book not in already_view.books.all():
                already_view.books.add(book)
                already_view.save()
            return Response(AlreadyViewSerializer(already_view).data, status=status.HTTP_201_CREATED)
        
    def put(self, request):
        user_id = request.data['view_userId']
        user = User.objects.get(id=user_id)
        already_view = get_object_or_404(AlreadyView, view_userId=user)
        serializer = AlreadyViewSerializer(already_view, data=request.data)
        if serializer.is_valid():
            book_id = request.data['bookId']
            book = Book.objects.get(id=book_id)
            if book in already_view.books.all():
                already_view.books.remove(book)
            already_view.books.add(book)
            already_view.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class UserView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    def put(self, request):
        user = User.objects.get(id=request.data['id'])
        data = request.data.copy()
        groups_data = data.pop('groups', [])
        data['groups'] = []  # временно добавляем пустой список групп
        serializer = UserSerializer(user, data=data)
        if serializer.is_valid():
            user = serializer.save()
            user.groups.clear()
            for group_data in groups_data:
                try:
                    group = Group.objects.get(name=group_data['name'])
                    user.groups.add(group)
                except Group.DoesNotExist:
                    pass  # если группа не существует, просто пропускаем ее
            for group in user.groups.all():
                if group.name not in [group_data['name'] for group_data in groups_data]:
                    user.groups.remove(group)
            user.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)








class HomeView(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (JWTAuthentication,)

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)
    
    def put(self, request, pk):
        user = User.objects.get(pk=pk)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    

class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try: 
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        

class RegisterView(APIView):
    permission_classes = (AllowAny,)
    
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)