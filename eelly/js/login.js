$(document).ready(function(){
    var $tab_t=$("#tab_t");
    var $login_list=$("#login_list");
    var $login_form1=$("#login_form1")
    //tab切换
    $tab_t.on("click","li",function(){
        $login_list.children().eq($(this).index()).show().siblings().hide()
            $(this).css({
                "border-bottom":"2px solid #CF1F3F",
                "color":"#CF1F3F"
            }).siblings().css({
                "border-bottom":"2px solid #D4D4D4",
                "color":"#000000"
            })
    })
    //登录判断
    var $login_user=$("#login_user");
    var $login_pass=$("#login_pass");
    var $login_cookie=cookie();
    var $login_reg=/^user/;
    if($login_cookie){
        $.each($login_cookie,function(key,val){
            if($login_reg.test(key)){
                var $login_coo= $.parseJSON(val);
                $("#login_btn").click(function(){
                    if($login_user.val()!=$login_coo.user){
                        alert("不存在此用户名！")
                    }else{
                        if($login_pass.val()!=$login_coo.password){
                            alert("密码错误！请重新输入")
                        }else{
                            var $val_log='{"user":"'+$login_user.val()+'","password":"'+$login_pass.val()+'","islogin":"true"}'
                            if($(".tendays").prop("checked")){
                                cookie("user"+$login_user.val(),$val_log,$(".tendays").val());

                            }else{
                                cookie("user"+$login_user.val(),$val_log,1);
                            }

                            location.assign("index.html");
                        }
                    }
                })
            }

        })
    }

})
