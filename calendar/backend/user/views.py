import json
from json import JSONDecodeError
from .models import User
from django.http import HttpResponse, HttpResponseNotAllowed, HttpResponseBadRequest, JsonResponse
from django.contrib.auth import login, authenticate, logout
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
            nickname = req_data['nickname']
            email = req_data['Email']
        except (KeyError, JSONDecodeError) as error:
            return HttpResponseBadRequest(error)
        try:
            User.objects.create_user(
                username=username, password=password, email=email, nickname=nickname)
        except IntegrityError:
            return HttpResponse(status=409)
        return HttpResponse(status=201)
    else:
        return HttpResponseNotAllowed(['POST'])


@csrf_exempt
def signout(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            logout(request)
            return HttpResponse(status=204)
        return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['GET'])


@csrf_exempt
def check_password(request):
    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            username = req_data['username']
            password = req_data['password']
        except (KeyError, JSONDecodeError) as error:
            return HttpResponseBadRequest(error)
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        user = authenticate(username=username, password=password)
        if user is None:
            return HttpResponse(status=403)
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['POST'])


@csrf_exempt
def userdata(request):
    if request.method == 'PUT':
        try:
            req_data = json.loads(request.body.decode())
            username = req_data['username']
            password = req_data['password']
            email = req_data['Email']
            firstname = req_data['firstname']
            lastname = req_data['lastname']
            phonenumber = req_data['phonenumber']
        except (KeyError, JSONDecodeError) as error:
            return HttpResponseBadRequest(error)
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        u = User.objects.get(username=username)
        u.set_password(password)
        u.firstname = firstname
        u.lastname = lastname
        u.phonenumber = phonenumber
        u.email = email
        u.save()
        login(request, u)
        return HttpResponse(status=204)

    elif request.method == 'GET':
        try:
            req_data = json.loads(request.body.decode())
            username = req_data['username']
        except (KeyError, JSONDecodeError) as error:
            return HttpResponseBadRequest(error)
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        u = User.objects.get(username=username)
        nickname = u.nickname
        email = u.email
        firstname = u.firstname
        lastname = u.lastname
        phonenumber = u.phonenumber
        return JsonResponse({"username": username, "nickname": nickname, "email": email, "firstname": firstname, "lastname": lastname, "phonenumber": phonenumber},
                            status=200, safe=False)
    else:
        return HttpResponseNotAllowed(['PUT', 'GET'])


@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponse(status=405)
