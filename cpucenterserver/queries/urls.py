from django.urls import path

from . import views

urlpatterns = [
    path("index", views.index),
    path("getCatalouge/<productType>/<priceLow>/<priceHigh>/<brands>", views.getCatalouge),
    path("fastSellers", views.fastSellers),
    path("lowStock", views.lowStock),
    path("newArrival", views.newArrival),
    path("sale", views.sale),
    path("lastChance", views.lastChance),
    path("getNews", views.getNews)
]