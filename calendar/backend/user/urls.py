from django.conf.urls import url
from user import views

urlpatterns = [
    url('signup/', views.signup),
    url('signin/', views.signin),
    url('signout/', views.signout),
    url('check_password/', views.check_password),
    url('userdata/', views.userdata),
    url('token/', views.token),
]
