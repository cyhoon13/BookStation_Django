from django.contrib import admin
from django.urls import path
#views.py 불러와야 된다.
from . import views

urlpatterns = [
    path("question/", views.question, name="question"),
    path("qnaWrite/", views.qnaWrite, name="qnaWrite"),
    path("qnaDetail/", views.qnaDetail, name="qnaDetail"),
    path("qnaUpdate/", views.qnaUpdate, name="qnaUpdate"),
]