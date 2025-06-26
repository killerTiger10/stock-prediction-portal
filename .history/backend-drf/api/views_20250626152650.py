from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from .serializers import StockPredictionSerializer
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import yfinance as yf
from datetime import datetime
import os
from django.conf import settings
from .utils import save_plot
from sklearn.preprocessing import MinMaxScaler
from keras.models import load_model

# Create your views here.

class StockPredictionAPIView(APIView):
    def post(self, request):
        serializer = StockPredictionSerializer(data=request.data)
        if serializer.is_valid():
            ticker = serializer.validated_data['ticker']
            
            # Fetch the data from yfinance
            now = datetime.now()
            start = datetime(now.year - 10, now.month, now.day)
            end = now
            df = yf.download(ticker, start, end)
            if df.empty:
                return Response({"error":"No data found for the given ticker.",
                                 "status": status.HTTP_404_NOT_FOUND})
            df = df.reset_index()
            
            # Generate Basic Plot
            plt.switch_backend('AGG')
            plt.figure(figsize=(12,5))
            plt.plot(df.Close, label='Closing Price')
            plt.title(f'Closing Price of ${ticker}')
            plt.xlabel('Days')
            plt.ylabel('Close Price')
            plt.legend()
            
            # Save the plot to a file
            plot_img_path = f'{ticker}_plot.png'
            plot_img = save_plot(plot_img_path)
            
            # 100 days moving average
            ma100 = df.Close.rolling(100).mean()
            plt.switch_backend('AGG')
            plt.figure(figsize=(12,5))
            plt.plot(df.Close, label='Closing Price')
            plt.plot(ma100,'r', label='100 DMA')
            plt.title(f'100 Days Moving Average of ${ticker}')
            plt.xlabel('Days')
            plt.ylabel('Close Price')
            plt.legend()
            plot_img_path = f'{ticker}_100_dma_plot.png'
            plot_100_dma_img = save_plot(plot_img_path)
            
            # 100 days moving average
            ma200 = df.Close.rolling(200).mean()
            plt.switch_backend('AGG')
            plt.figure(figsize=(12,5))
            plt.plot(df.Close, label='Closing Price')
            plt.plot(ma100,'r', label='100 DMA')
            plt.plot(ma200,'g', label='200 DMA')
            plt.title(f'200 Days Moving Average of ${ticker}')
            plt.xlabel('Days')
            plt.ylabel('Close Price')
            plt.legend()
            plot_img_path = f'{ticker}_200_dma_plot.png'
            plot_200_dma_img = save_plot(plot_img_path)
            
            data_training = pd.DataFrame(df.Close[0:int(len(df)*0.7)]) # 70% data
            data_testing = pd.DataFrame(df.Close[int(len(df)*0.7):int(len(df))]) # 30% data

            # Scaling down the data between 0 and 1
            scaler = MinMaxScaler(feature_range=(0,1)) 
            
            # Load ML Model
            model = load_model('Resources/stock_prediction_model.keras')
            
            #
            
            return Response({
                'status': 'success', 
                'plot_img': plot_img,
                'plot_100_dma_img': plot_100_dma_img,
                'plot_200_dma_img': plot_200_dma_img
                })