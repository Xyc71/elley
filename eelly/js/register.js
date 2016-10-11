$(document).ready(function() {
    var $next=$("#next");
    var $finish=$("#finish");
    var $form1=$("#reg_form");
    var $form2=$("#reg_form2");
    var $step=$("#step");
    var $spans=$step.find("span");
    var $ps=$step.find("p");
    var $phone=$("#phone");
    var $password=$("#password");
    var $check=$("#check");
    var checkbox=document.getElementById("checkbox");
    var $code=$("#code");
    var $error=$(".error");
    var $pw=$("#pw");
    var $reget=$("#reget");
    var $randomn=$("#randomNumber");
    var form2_btn=document.getElementById("form2_btn");
    var $form2_btn=$("#form2_btn");
    var a=0;
    var b=0;
    var c=0;

    //点击下一步实现form表单的出现消失
    $next.on("click",function(){
        if(checkbox.checked==false){
            $error.eq(3).html("<img src='images/error_icon1.gif'>&nbsp;请阅读并同意协议！")
        }else if(a==1&&b==1&&c==1&&checkbox.checked==true){
            //cookie
            var $val='{"user":"'+$phone.val()+'","password":"'+$password.val()+'"}';
            cookie("user"+$phone.val(),$val,1);
            var $coo=cookie();
            if($coo){
                $.each($coo,function(key,val){
                    var $coo1= $.parseJSON(val);
                    $(".reg_li2").html("注册手机 : "+$coo1.user)
                })
            }
            //form的出现和消失
            $form1.stop().hide();
            $form2.stop().show();
            //圆点的改变
            $spans.eq(1).animate({
                fontSize:14
            },0,function(){
                $spans.eq(1).css({
                    "backgroundColor":"#D47F8D",
                    "color":"#FFFFED"
                });
                $ps.eq(1).css("color","#313131")
            });
            $spans.eq(0).animate({
                fontSize:14
            },0,function(){
                $spans.eq(0).css({
                    "backgroundColor":"#F0F0F0",
                    "color":"#969696"
                })
                $ps.eq(0).css("color","#969696")
            })
        }
        daojishi();
    })
    //点击注册完成跳转
    $finish.on("click",function(){
        window.location.assign("index.html");
        var $val='{"user":"'+$phone.val()+'","password":"'+$password.val()+'","islogin":"true"}';
        cookie("user"+$phone.val(),$val,1);
    })



    //点击重新获取短信
    $form2_btn.on("click",daojishi)
    //随机验证码的出现
    $randomn.html(randomCode())
    //点击重新获取验证码
    $reget.on("click",function(){
        $randomn.html(randomCode())
    })
    //input的获得焦点和失去焦点
    //输入手机
    $phone.focusin(function(){
        $(this).css({
            "background":"#fff",
            "box-shadow":"0 0 2px 2px #cde9fc",
            "border":"1px solid #b3cbea"
        })
    })
    $phone.focusout(function(){
        var reg=/^1[34578]\d{9}$/;
        $(this).css({
            "background":"#FAFAFA",
            "box-shadow":"2px 2px 0 0 #efefef inset",
            "border":"0px"
        });
        if(reg.test($phone.val())){
            a=1;
            $error.eq(0).html("<img src='images/error_icon2.gif'>")
        }else if($(this).val()==""){
            $error.eq(0).html("<img src='images/error_icon1.gif'> &nbsp;请输入手机号！")
        }else{
            $error.eq(0).html("<img src='images/error_icon1.gif'> &nbsp;手机格式错误！")
        }
    })
    //输入密码
    $password.focusin(function(){
        $pw.stop().show()
        $(this).css({
            "background":"#fff",
            "box-shadow":"0 0 2px 2px #cde9fc",
            "border":"1px solid #b3cbea"
        })
    })
    $password.focusout(function(){
        var reg = /^(?![^a-zA-Z]+$)(?!\D+$).{6,16}/;
        var reg1=/^\d{6,16}$/;
        var reg2=/^[a-zA-Z]{6,16}$/
        $pw.stop().hide()
        $(this).css({
            "background":"#FAFAFA",
            "box-shadow":"2px 2px 0 0 #efefef inset",
            "border":"0px"
        })
        if(reg.test($password.val())){
            b=1;
            $error.eq(1).html("<img src='images/error_icon2.gif'>")
        }else if($(this).val()==""){
            $error.eq(1).html("<img src='images/error_icon1.gif'> &nbsp;登录密码不能为空！")
        }else if(reg1.test($password.val())||reg2.test($password.val())){
            $error.eq(1).html("<img src='images/error_icon1.gif'> &nbsp;登录密码太简单！")
        }else{
            $error.eq(1).html("<img src='images/error_icon1.gif'> &nbsp;密码格式错误！")
        }
    })
    //输入验证码
    $check.focusin(function(){
        $(this).css({
            "background":"#fff",
            "box-shadow":"0 0 2px 2px #cde9fc",
            "border":"1px solid #b3cbea"
        })
    })
    $check.focusout(function(){
        $(this).css({
            "background":"#FAFAFA",
            "box-shadow":"2px 2px 0 0 #efefef inset",
            "border":"0px"
        })
        if($(this).val().toLocaleUpperCase()==$randomn.html().toUpperCase()){
            c=1;
            $error.eq(2).html("<img src='images/error_icon2.gif'>")
        }else{
            $error.eq(2).html("<img src='images/error_icon1.gif'> &nbsp;验证码错误！")
            $randomn.html(randomCode())
        }
    })
    $code.focusin(function(){
        $(this).css({
            "background":"#fff",
            "box-shadow":"0 0 1px 1px #cde9fc",
            "border":"1px solid #b3cbea"
        })
    })
    $code.focusout(function(){
        $(this).css({
            "background":"#FAFAFA",
            "box-shadow":"2px 2px 0 0 #efefef inset",
            "border":"1px solid #D5D5D5"
        })
    })


    function randomCode(){//获取随机验证码函数
        var arr=[];
        for(var i=0;i<4;i++){
            var n=randomNumber(48,122);
            if((n>=48&&n<=57)||(n>=65&&n<=90)||(n>=97&&n<=122)){
                var m=String.fromCharCode(n);
                arr.push(m);
            }else{
                i=i-1;
            }
        }
        return arr.join("");
    }
    function randomNumber(min,max){
        return parseInt(Math.random()*(max-min))+min;
    }
    function daojishi(){
        var timer=null;
        var n=59;
        timer=setInterval(function(){
            n-=1;
            form2_btn.value="重新发送"+"("+n+")";
            form2_btn.disabled=true;//使按钮失效
            if(n==0){clearInterval(timer);//60秒倒计时结束 使按钮可用 并将内容变成获取
                form2_btn.value="重新发送";
                form2_btn.disabled=false;
            }
        },1000);
    }
})