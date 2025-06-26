from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
# Create your views here.

class StockPredictionAPIView(APIView):
    def post(self, request):
        serializer = StockPredictionAPIView(data=request.data)
        if serializer.is_valid():
            ticker = serializer.validated_data['ticker']
            return Response({'status': 'success'})