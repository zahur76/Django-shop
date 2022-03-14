from math import prod
from operator import sub
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.shortcuts import HttpResponse, get_object_or_404
import json
from django.contrib.auth import authenticate, login, logout
from .models import Product, Category, subCategory

# Create your views here.
def home(request):
    """View to return all women objects"""
    print("im here")
    category = get_object_or_404(Category, name='women').cat.all()
    subcategory = {}
    subcategory_list = []
    for cat in category:
        subcategory[cat.id]=cat.name
        subcategory_list.append(cat.name)
    subcategory_list.sort()
    product_list = []
    women = {}
    all_data =Product.objects.values(
        "id",
        "category",
        "subcategory",
        "name",
        "sku",
        "stock_available",
        "sizes_available",
        "image",
    )
    for data in all_data:
        product_list.append(data)
        data['category']='women'
        data['subcategory']=subcategory[data['subcategory']]
    women['products']=product_list
    women['subcategory']=subcategory_list
    print(women)
    return HttpResponse(json.dumps(women), content_type="application/json")


@require_POST
@csrf_exempt
def login_view(request):
    """View to authenticate login"""

    if request.method == "POST":
        data = json.loads(request.body)
        username = data["username"]
        password = data["password"]
        user = authenticate(request, username=username, password=password)        
        if user:
            login(request, user)
            data = {"login": True}
            return HttpResponse(json.dumps(data), content_type="application/json")
        data = {"login": False}
        return HttpResponse(json.dumps(data), content_type="application/json")


def logout_view(request):
    """View to authenticate login"""
    data = {"login": False}

    return HttpResponse(json.dumps(data), content_type="application/json")
