from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Book, BookReview, Basket, User
from .serializer import BookSerializer, BookReviewSerializer, UserSerializer, BasketSerializer
from rest_framework import viewsets, status, authentication


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
            serializer.save()
            return Response(serializer.data)


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




class HomeView(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (JWTAuthentication,)

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)

    

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