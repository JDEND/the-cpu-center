from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
import json
from django.db import connection
from newsapi import NewsApiClient

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

@csrf_exempt
def getNews(request):
       newsapi = NewsApiClient(api_key='72191ad24f2d45e68762b283fb05d711')

       top_headlines = newsapi.get_top_headlines(sources='ars-technica')
       articles = top_headlines['articles']

       newsList = []
       for i in range(len(articles)):
              newsList.append({
                     "Description":articles[i]['description'],
                     "Title":articles[i]['title'],
                     "ImgUrl":articles[i]['urlToImage'],
                     "Link":articles[i]['url']
              })
              # desc.append(articles[i]['description'])
              # news.append(articles[i]['title'])
              # img.append(articles[i]['urlToImage'])

       

       return JsonResponse(newsList, safe=False)

@csrf_exempt
def newOrder(request):
       cursor.execute('EXEC [dbo].[sp_NewOrder] @customerNumber=10000, @shipAddress=10000, @tax=3.39')
       cursor.execute('SELECT dbo.[fn_PlacedOrder]()')
       temp = cursor.fetchall()

       lines = json.loads(request.body)

       for i in range(len(lines)):             
              cursor.execute('EXEC [dbo].[sp_insertLineItem] @lineItem=' + str(i + 1)+', @itemID='+str(lines[i]['ProductID'])+', @orderID='+str(temp[0][0])+', @quantity='+str(lines[i]['PurchaseQuantity']))
       
       return(HttpResponse('100'))

@csrf_exempt
def getUserOrders(request, userID):
       cursor.execute('EXEC [dbo].[sp_userOrders] @userID=' + str(userID))
       temp = cursor.fetchall()

       return(HttpResponse(temp[0], content_type='application/json'))