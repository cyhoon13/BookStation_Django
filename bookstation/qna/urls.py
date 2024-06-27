from django.contrib import admin
from django.urls import path
#views.py 불러와야 된다.
from . import views

urlpatterns = [
    path("question/", views.question, name="question"),
    path("qnaWrite/", views.qnaWrite, name="qnaWrite"),
    path("qnaDetail/<int:qna_id>/", views.qnaDetail, name="qnaDetail"),
    path("qnaUpdate/<int:qna_id>/", views.qnaUpdate, name="qnaUpdate"),
    path("qnaDelete/<int:qna_id>/", views.qnaDelete, name="qnaDelete"),
]