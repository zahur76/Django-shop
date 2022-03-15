from cgi import print_form
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
    logout(request)
    data = {"login": False}

    return HttpResponse(json.dumps(data), content_type="application/json")


def category_view(request, category):
    """View to return category products"""
    category_ = get_object_or_404(Category, name=category)
    all_subcategory = get_object_or_404(Category, name=category).cat.all()
    subcategory = {}
    subcategory_list = []
    for cat in all_subcategory:
        subcategory[cat.id]=cat.name
        subcategory_list.append(cat.name)
    subcategory_list.sort()
    product_list = []
    product_dict = {}
    all_data =Product.objects.values(
        "id",
        "category",
        "subcategory",
        "name",
        "price",
        "sku",
        "stock_available",
        "sizes_available",
        "rating",
        "image",
    ).filter(category=category_.id)
    for data in all_data:
        product_list.append(data)
        data['rating'] = round(data['rating'])
        data['category']= category
        data['subcategory']=subcategory[data['subcategory']]
    product_dict['products']=product_list
    product_dict['subcategory']=subcategory_list
    
    return HttpResponse(json.dumps(product_dict), content_type="application/json")


def category_list(request):
    """View to return subcategories for each list"""
    subcategory_list = {}
    category = Category.objects.all()
    for cat in category:
        subcategory_list[cat.name] = list(cat.cat.all().values_list('name', flat=True))

    return HttpResponse(json.dumps(subcategory_list), content_type="application/json")


@require_POST
def add_product(request):
    """View to add product"""

    if request.method == "POST":

        data = request.POST
        file = request.FILES["image"]

        category = get_object_or_404(Category, name=data['category'])
        subcategory_ = category.cat.all()
        for sub in subcategory_:
            if sub.name==data['subcategory']:
                subcategory_=sub
        new_product = Product.objects.create(
            category=category,
            subcategory=subcategory_,
            name=data['name'],
            price=int(data['price']),
            stock_available=data["stock_available"],
            sizes_available=data["sizes_available"],
            image=file,
        )
        new_product.save()
       
        

        return HttpResponse(status=200)
