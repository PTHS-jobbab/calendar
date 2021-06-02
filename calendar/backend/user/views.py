import json
from json import JSONDecodeError
from django.contrib.auth.models import User
from django.http import HttpResponse, HttpResponseNotAllowed, HttpResponseBadRequest, JsonResponse
from django.contrib.auth import login,authenticate,logout
from django.views.decorators.csrf import ensure_csrf_cookie
from django.db.utils import IntegrityError
from django.views.decorators.csrf import csrf_exempt

# Create your views here.

@csrf_exempt
def signin(request):
    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            username = req_data['username']
            password = req_data['password']
        except (KeyError, JSONDecodeError) as error:
            return HttpResponseBadRequest(error) 
        user = authenticate(username=username, password=password)
        if user is None:
            return HttpResponse(status=401)
        login(request, user)
        return HttpResponse(status=204)
    return HttpResponseNotAllowed(['POST'])

@csrf_exempt
def signup(request):
    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            username = req_data['username']
            password = req_data['password']
        except (KeyError, JSONDecodeError) as error:
            return HttpResponseBadRequest(error)
        try :
            User.objects.create_user(username=username, password=password)
        except IntegrityError:  
            return HttpResponse(status=409)
        return HttpResponse(status=201)
    else :
        return HttpResponseNotAllowed(['POST'])

@csrf_exempt
def signout(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            logout(request)
            return HttpResponse(status=204)
        else:
            return HttpResponse(status=401)
    else : 
        return HttpResponseNotAllowed(['GET'])


@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponse(status=405)