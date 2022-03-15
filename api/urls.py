# for media files setting
from django.conf import settings
from django.urls import path

from . import views

urlpatterns = [
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("add_product", views.add_product, name="add_product"), 
    path("category_list", views.category_list, name="category_list"),
    path("<str:category>", views.category_view, name="category"),     
]