# for media files setting
from django.conf import settings
from django.urls import path

from . import views

urlpatterns = [
    
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),    
    path("add_product", views.add_product, name="add_product"),
    path("delete_product/<int:category_id>", views.delete_product, name="delete_product"),  
    path("category_list", views.category_list, name="category_list"),
    path("all_products", views.all_products, name="all_prodcucts"),
    path("process_order", views.process_order, name="process_order"), 
    path("<str:category>", views.category_view, name="category"),        
]