from django.shortcuts import render
from .models import qna
from django.http import HttpResponse, HttpResponseRedirect
from django.core.paginator import Paginator #페이지 처리해주는 클래스
# Create your views here.

#문의내역
def question(request):
    # return render(request, "qna/question.html")
    # user = request.user
    # if not user.is_authenticated:
        # 로그인되지 않은 사용자는 로그인 페이지로 리디렉션
        # return redirect('login')

    #question_list = Question.objects.all()
    qna_list = qna.objects.filter(member_id="member1").order_by("qna_date")
    paginator = Paginator(qna_list, 10)  # 페이지당 10개 항목 표시

    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    return render(request, 'qna/question.html', {'page_obj': page_obj})

#문의 작성하기
def qnaWrite(request):
    return render(request,"qna/qnaWrite.html")

#문의 세부내용
def qnaDetail(request):
    return render(request,"qna/qnaDetail.html")

#문의 수정
def qnaUpdate(request):
    return render(request,"qna/qnaUpdate.html")
