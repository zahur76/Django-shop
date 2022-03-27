from django.contrib import admin

from .models import Category, Product, subCategory, Order

# Register your models here.


class ProductAdmin(admin.ModelAdmin):
    # what to be displayed in admin
    list_display = (
        "id",
        "name",
        "category",
        "subcategory",
        "sku",
    )


class CategoryAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
    )


class subCategoryAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "category",
    )

class orderAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "order_number",
    )


# The model followed by class name (model, class name)
admin.site.register(Product, ProductAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(subCategory, subCategoryAdmin)
admin.site.register(Order, orderAdmin)