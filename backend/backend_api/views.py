from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Book
from .serializer import BookSerializer

# Create your views here.
class BookView(APIView):
    def get(self, request):
        output = [
            {
                "id": output.id,
                "title": output.title,
                "author": output.author,
                "price": output.price,
                "img": output.img,
            } for output in Book.objects.all()
        ]
        return Response(output)
    def post(self, request):
        serializer = BookSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
