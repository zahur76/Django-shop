from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.shortcuts import HttpResponse, get_object_or_404
import json
from django.contrib.auth import authenticate, login, logout

# Create your views here.
def home(request):
    return render('<h1>zahur<h1>')


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