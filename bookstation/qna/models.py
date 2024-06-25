from django.db import models

# Create your models here.
class qna(models.Model):
    qna_id = models.IntegerField(primary_key=True) # 문의 번호
    member_id = models.CharField(max_length=30) # 회원 아이디
    qna_date = models.DateTimeField()  # 작성 날짜
    qna_type = models.IntegerField() # 문의 유형
    qna_title = models.CharField(max_length=100) # 문의 제목
    qna_content = models.CharField(max_length=1000) # 문의 내용
    qna_state = models.CharField(max_length=40) # 처리상태