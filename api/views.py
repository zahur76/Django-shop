from cgi import print_form
from math import prod
from operator import sub
from django.http import QueryDict
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.shortcuts import HttpResponse, get_object_or_404
import json
from django.contrib.auth import authenticate, login, logout
from .models import Product, Category, subCategory, Order
from django.core.mail import send_mail
from django.conf import settings

# Create your views here.
# def all_products(request):
#     """View to return all products"""
#     print('zahur')
#     all_category = Category.objects.all()
#     all_subcategory = subCategory.objects.all()
#     product_list = []
#     all_products = Product.objects.all().values('id', 'category', 'subcategory', 'name', 'sku', 'image')
#     for product in all_products:
#         product_list.append(product)
#         product['category'] = all_category.filter(id=product['category']).values('name')[0]['name']
#         product['subcategory'] = all_subcategory.filter(id=product['subcategory']).values('name')[0]['name']

#     return HttpResponse(json.dumps(product_list), content_type="application/json")


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
        data['sizes_available']= data['sizes_available'].split(',')

    product_dict['products']=product_list
    product_dict['subcategory']=subcategory_list
    
    return HttpResponse(json.dumps(product_dict), content_type="application/json")


def all_products(request):
    """View to return all products"""
    print('zahur')
    all_data =Product.objects.values(
        "id",
        "category",
        "subcategory",
        "name",
        "price",
        "sku",
        "stock_available",
        "sizes_available",
        "image",
    )

    for data in all_data:
        data['category']= get_object_or_404(Category, id=data['category']).name
        data['subcategory']= get_object_or_404(subCategory, id=data['subcategory']).name
    return HttpResponse(json.dumps(list(all_data)), content_type="application/json")


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
    if not request.user.is_superuser:

        return HttpResponse(status=500)

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


def delete_product(request, category_id):
    """View to return subcategories for each list"""
    if not request.user.is_superuser:
        return HttpResponse(status=500)   


    product = get_object_or_404(Product, id=category_id)
    product.delete()
    return HttpResponse(status=200)


@require_POST
def process_order(request):
    """View to process product"""
    if request.method == "POST":

        data = request.POST
        order = Order.objects.create(
            first_name=data['first_name'],
            last_name=data['last_name'],
            email=data['email'],
            address_one=data['address_one'],
            address_two=data['address_two'],
            phone_number=data['phone_number'],
            json_order = data['order']
        )
        order.save()
    return HttpResponse(status=200)


@require_POST
def query(request):
    if request.method == "POST":
        data = request.POST
        message = f'{data["query"]}\n{data["name"]}\n{data["email"]}'
        send_mail(
            'Query',
            message,        
            settings.DEFAULT_FROM_EMAIL,
            ['zahurmeerun@hotmail.com'],
            fail_silently=False,
        )

    return HttpResponse(status=200)