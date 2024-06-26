from django.shortcuts import render, redirect
from .models import qna
from django.http import HttpResponse, HttpResponseRedirect
from django.core.paginator import Paginator #페이지 처리해주는 클래스
from django.utils import timezone
# Create your views here.

#문의내역
def question(request):
    # 세션에서 로그인된 사용자 ID 가져오기
    member_id = request.session.get('login_id')
    if not member_id:
        # 세션에 로그인 ID가 없으면 로그인 페이지로 리디렉션
        return redirect('login')

    # 로그인된 사용자의 문의 내역을 필터링하여 가져오기
    qna_list = qna.objects.filter(member_id=member_id).order_by("qna_date")
    paginator = Paginator(qna_list, 10)  # 페이지당 10개 항목 표시

    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    return render(request, 'qna/question.html', {'page_obj': page_obj})

#문의 작성하기
def qnaWrite(request):
    if request.method != 'POST':  # GET 방식
        member_id = request.session.get('login_id')
        if not member_id:
            return redirect('login')
        return render(request, "qna/qnaWrite.html", {'member_id': member_id})
    else:  # POST 방식
        member_id = request.session.get('login_id')
        if not member_id:
            return redirect('login')

        # 폼 데이터에서 값 가져오기
        qna_type = request.POST.get('qna_type')
        qna_title = request.POST.get('qna_title')
        qna_content = request.POST.get('qna_content')

        # 디버깅 출력
        print(f"member_id: {member_id}, qna_type: {qna_type}, qna_title: {qna_title}, qna_content: {qna_content}")

        # Qna 객체 생성 및 저장
        q = qna(
            member_id=member_id,
            qna_type=qna_type,
            qna_title=qna_title,
            qna_content=qna_content
        )
        q.save()  # insert, update -> save(), delete -> delete()

        return redirect('question')  # 'question' URL 이름으로 리디렉션

#문의 세부내용
def qnaDetail(request):
    return render(request,"qna/qnaDetail.html")

#문의 수정
def qnaUpdate(request):
    return render(request,"qna/qnaUpdate.html")
