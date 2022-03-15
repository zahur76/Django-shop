import uuid

from django.db import models


class Category(models.Model):
    class Meta:
        verbose_name_plural = "Categories"

    name = models.CharField(max_length=254)

    # Will return the actual name in admin fields
    def __str__(self):
        return self.name


class subCategory(models.Model):
    class Meta:
        verbose_name_plural = "subCategory"

    name = models.CharField(max_length=254)
    category = models.ForeignKey(
        "Category", null=True, blank=True, on_delete=models.SET_NULL, related_name="cat"
    )
    # category.cat.all: will return all subCategory for that specific category

    # Will return the actual name in admin fields
    def __str__(self):
        return self.name


class Product(models.Model):

    category = models.ForeignKey(
        "Category",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="prod",
    )
    subcategory = models.ForeignKey(
        "subCategory", null=True, blank=True, on_delete=models.SET_NULL
    )
    name = models.CharField(max_length=254)
    price = models.IntegerField()
    sku = models.CharField(max_length=254, null=True, blank=True)
    stock_available = models.IntegerField()
    sizes_available = models.CharField(
        max_length=254, null=True, blank=True, default="s,m,lg"
    )
    rating = models.DecimalField(max_digits=3, decimal_places=1 , default=0.0)
    image = models.ImageField(null=False, blank=False)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        """
        Create SKU on save
        """
        first_sku = self.category
        second_sku = self.subcategory
        self.sku = (
            f"{first_sku.name[0]}/{second_sku.name[0]}-"
            + (uuid.uuid4().hex.upper())[:8]
        )
        super().save(*args, **kwargs)
