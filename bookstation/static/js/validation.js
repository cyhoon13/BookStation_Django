/*
기능 : 유효성검사를 위한 js
작성자 : 조영훈
작성날짜 : 2024.05.04
*/


// 이용약관 동의에서 필수 항목을 모두 체크시에만 다음 버튼이 활성화
$('.agree').change(function() { // 각 동의 체크박스 변경 시 다음 버튼 상태 업데이트
    updateNextButtonState();
});

$('#allAgree').change(function() { // 전체 동의하기 체크박스 변경 시 다음 버튼 상태 업데이트
    if ($(this).is(':checked')) {
        $('.agree').prop('checked', true);
    } else {
        $('.agree').prop('checked', false);
    }
    updateNextButtonState();
});

function updateNextButtonState() { // 다음 버튼 상태 업데이트 함수
    var required1Checked = $('#required1').is(':checked');
    var required2Checked = $('#required2').is(':checked');
    var required3Checked = $('#required3').is(':checked');

    if (required1Checked && required2Checked && required3Checked) {
        $('#nextbutton').prop('disabled', false);
    } else {
        $('#nextbutton').prop('disabled', true);
    }
}

// ==================================================================
//생년월일 0000-00-00형식으로 받아주는 코드
function formatDate(input) {
    var value = $(input).val().replace(/[^\d]/g, '');
    var formattedDate = '';
    if (value.length > 0) {
        var year = value.substring(0, 4);
        var month = value.substring(4, 6);
        var day = value.substring(6, 8);
        formattedDate = year;
        if (month) {
            formattedDate += '-' + month;
            if (day) {
                formattedDate += '-' + day;
            }
        }
    }
    $(input).val(formattedDate);
}
// ==================================================================

// 전화번호 자동 하이픈(-) 넣어주는 코드
$(document).on("keyup", "#phone", function() {
    $(this).val($(this).val().replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/, "$1-$2-$3" ).replace("--", "-")); 
});
function numberphone(e){
    if(e.value.length>13){
    e.value=e.value.slice(0,13);	
    }
}

// ==================================================================
//기본정보 입력 유효성 검사

$(function() {
    // 검사 결과 저장 객체
    var valid = {
        memberIDValid: false,
        memberPWValid: false,
        memberPWCheckValid: false,
        isAllValid: function() {
            return this.memberIDValid && this.memberPWValid && this.memberPWCheckValid;
        }
    };

    // 아이디 검사
    // $("#userId").blur(function() {
    //     var regex = /^(?=.*[a-z])(?=.*[0-9])[a-z0-9]{5,20}$/;
    //     var target = $(this);
    //     var memberID = $(this).val();
    //     var isValid = regex.test(memberID);
    //     valid.memberIDValid = isValid;
    //     if (!isValid) { // 형식 위반
    //         target.removeClass("valid1 invalid1 invalid2").addClass("invalid1");
    //         updateNextButtonState2();
    //         return;
    //     }
    //     $.ajax({
    //         url: "checkId.do",
    //         method: "get",
    //         data: { member_id: memberID },
    //         success: function(response) {
    //             if (response == "Y") { // 사용할 수 있는 아이디
    //                 valid.memberIDValid = true;
    //                 target.removeClass("valid1 invalid1 invalid2").addClass("valid1");
    //             } else { // 이미 있는 아이디
    //                 valid.memberIDValid = false;
    //                 target.removeClass("valid1 invalid1 invalid2").addClass("invalid2");
    //             }
    //             updateNextButtonState2();
    //         },
    //         error: function() { // 통신 오류
    //             alert("오류가 발생했습니다.\n나중에 다시 시도해주세요.");
    //             valid.memberIDValid = false;
    //             updateNextButtonState2();
    //         }
    //     });
    // });

    // 비밀번호 검사
    $("#userPwd").blur(function() {
        var regex = /^(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9!@#$%^&*?=+_-]{8,16}$/;
        var isValid = regex.test($(this).val());
        valid.memberPWValid = isValid;
        $(this).removeClass("valid2 valid3 invalid3 invalid4").addClass(isValid ? "valid2" : "invalid3");
        updateNextButtonState2();
    });

    // 비밀번호 확인 검사
    $("#rePwd").blur(function() {
        var memberPW = $("#userPwd").val();
        var memberPWCheck = $(this).val();
        var isEmpty = !memberPW;
        var isValid = memberPW == memberPWCheck;
        valid.memberPWCheckValid = isValid && !isEmpty;
        $(this).removeClass("valid2 valid3 invalid3 invalid4");
        if (isValid) $(this).addClass("valid3"); // 비밀번호 일치
        else $(this).addClass("invalid4"); // 비밀번호 불일치
        updateNextButtonState2();
    });

    // 회원가입 이메일 인증
    var code = ""; // 이메일 전송 인증번호 저장 위한 코드
    var isVerified = false; // 인증번호가 일치하는지 확인하는 상태

    // 기본 정보를 모두 입력시에만 다음 버튼 활성화
    $('#userId, #userPwd, #rePwd, #userName, #birth, #userEmail, #emailNum').on('input', function() {
        updateNextButtonState2();
    });

    // 인증번호 이메일 전송 
    // $("#sendemailbutton").click(function() {
    //     var email = $("#userEmail").val(); // 입력한 이메일
    //     var checkBox = $("#emailNum"); // 인증번호 입력란

    //     $.ajax({
    //         type: "GET",
    //         url: "mailCheck.do?email=" + email,
    //         success: function(data) {
    //             if (data === "fail") {
    //                 alert("인증번호 발송이 실패했습니다. 이메일 주소를 확인해 주세요.");
    //             } else {
    //                 checkBox.attr("disabled", false);
    //                 checkBox.focus();
    //                 code = data;
    //                 isVerified = false; // 새로운 인증번호가 발송되면 인증 상태를 초기화
    //                 alert("인증번호가 발송되었습니다."); // 인증번호 발송 알림 메시지
    //             }
    //         },
    //         error: function() {
    //             alert("오류가 발생했습니다.\n나중에 다시 시도해주세요."); // 통신 에러   
    //         }
    //     });
    // });

    // 인증번호 비교
    // $("#emailnumcheck").click(function() {
    //     var inputCode = $("#emailNum").val(); // 입력코드

    //     if (inputCode === code) { // 일치할 경우
    //         alert("인증이 완료되었습니다.");
    //         isVerified = true;
    //     } else { // 일치하지 않을 경우
    //         alert("인증에 실패했습니다. 인증번호를 다시 확인해 주세요.");
    //         isVerified = false;
    //     }
    //     updateNextButtonState2(); // 인증 상태 변경 시에도 버튼 상태 업데이트
    // });

    // function updateNextButtonState2() {
    //     var allFilled = true;

    //     if ($('#userId').hasClass('invalid1') || $('#userId').hasClass('invalid2') ||
    //         $('#userPwd').hasClass('invalid3') || $('#rePwd').hasClass('invalid4') ||
    //         $('#userId').val() === '' || $('#userPwd').val() === '' || $('#rePwd').val() === '' ||
    //         $('#userName').val() === '' || $('#birth').val() === '' || $('#userEmail').val() === '' ||
    //         $('#emailNum').val() === '') {
    //         allFilled = false;
    //     }

    //     if (allFilled && isVerified && valid.isAllValid()) { // 모든 조건이 충족될 때
    //         $('#nextbutton2').prop('disabled', false);
    //     } else {
    //         $('#nextbutton2').prop('disabled', true);
    //     }
    // }
});

// ==================================================================
//계정정보 확인 인증번호 전송 
    var code = "";                //이메일전송 인증번호 저장위한 코드
    
    $("#sendemailbutton2").click(function(){
        
        var email = $("#email").val();        // 입력한 이메일
        var checkBox = $("#emailnum");        // 인증번호 입력란
        
        $.ajax({
            
            type:"GET",
            url:"mailCheck2.do?email=" + email,
            success:function(data){
            	if (data === "fail") {
                    alert("인증번호 발송이 실패했습니다. 이메일 주소를 확인해 주세요.");
                } else {
                    checkBox.attr("disabled", false);
                    checkBox.focus();
                    code = data;
                    isVerified = false; // 새로운 인증번호가 발송되면 인증 상태를 초기화
                    alert("인증번호가 발송되었습니다."); // 인증번호 발송 알림 메시지
                }
            },
            error: function() {
                alert("오류가 발생했습니다.\n나중에 다시 시도해주세요."); // 통신 에러   
            }
        });          
    });
    
    //인증번호 비교 
    $("#emailnumcheck2").click(function(){
        
        var inputCode = $("#emailnum").val();        // 입력코드     
        
        if(inputCode == code){                            // 일치할 경우
           alert("인증이 완료되었습니다.");
           $('#findButton').prop('disabled', false);
        } else {                                            // 일치하지 않을 경우
           alert("인증에 실패했습니다. 인증번호를 다시 확인해 주세요.");
           $('#findButton').prop('disabled', true);
        }    
    });
// ==================================================================
// 비밀번호 변경 버튼 클릭 시 실행될 함수
	function changePassword() {
		   if ($("#userPwd").hasClass("invalid3") || $("#rePwd").hasClass("invalid4")) {
		       alert("비밀번호를 확인해 주세요.");
		       return false;
		   } else {
		       alert("비밀번호 변경이 완료되었습니다. 로그인해 주세요.");
		       return true;
		   }
	}







