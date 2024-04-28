from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
import json
from django.db import connection

cursor = connection.cursor()

# Create your views here.
@csrf_exempt
def index(request):
       testItem = []
       for i in range(10):
              testItem.append(
        {'imgSrc': "..\\..\\assets\\images\\banner.jpeg",
        'productId': i,
        'productName': "Product" + str(i),
        'manufacturer': "BNE",
        'description': "this is a test product",
        'listPrice': i*10,
        'noLongerAvailable': False,
        'productType': "CPU"})
       return(JsonResponse(testItem, safe=False))

@csrf_exempt
def getCatalouge(request, productType, priceLow, priceHigh, brands):

       cursor.execute('EXEC [dbo].[sp_TestProducts2] @productType='+ str(productType) + ', @priceHigh='+str(priceHigh)+', @priceLow='+str(priceLow)+', @Brands='+ brands)
       #cursor.execute('EXEC [dbo].[sp_TestProducts] @productType='+'GPU'+', @priceHigh='+'40'+', @priceLow='+'30'+', @Brands='+'\'BNE,AIDIVN\'')
       temp = cursor.fetchall()
       return(HttpResponse(temp[0], content_type='application/json'))

@csrf_exempt
def fastSellers(request):
       #this needs to be changed once orders are implemented
       cursor.execute('EXEC [dbo].[sp_lowStock]')
       temp = cursor.fetchall()
       return(HttpResponse(temp[0], content_type='application/json'))
                                           
@csrf_exempt
def lowStock(request):
       cursor.execute('EXEC [dbo].[sp_lowStock]')
       temp = cursor.fetchall()
       return(HttpResponse(temp[0], content_type='application/json'))

@csrf_exempt
def newArrival(request):
       cursor.execute('EXEC [dbo].[sp_newArrivals]')
       temp = cursor.fetchall()
       return(HttpResponse(temp[0], content_type='application/json'))

@csrf_exempt
def sale(request):
       cursor.execute('EXEC [dbo].[sp_bigSale]')
       temp = cursor.fetchall()
       return(HttpResponse(temp[0], content_type='application/json'))

@csrf_exempt
def lastChance(request):
       cursor.execute('EXEC [dbo].[sp_lastChanceBuys]')
       temp = cursor.fetchall()
       return(HttpResponse(temp[0], content_type='application/json'))