$(document).ready(function(){
    var $adv=$(".adv");
    var $adv_btn=$("#adv_btn")
    var $nav=$(".nav");
    var $iphone=$(".iphone");
    var $andriod=$(".andriod");
    var $ftlink=$(".ft_link");
    var $ftpic=$(".ft_pic");
    var $mapL=$("#map_l");
    var $sidebar=$(".sidebar");
    var $sideT=$(".sidebar_t");
    var $back=$("#turnback");
    var $flag=true;
    //广告的关闭
    $adv_btn.click(function(){
        $adv.stop().slideUp("slow")
    })
    //副导航栏的出现消失
    $nav.children().eq(6).prevAll().mouseenter(function(){
        $(this).find("ul").stop().show();
        $(this).css({
            "borderLeft":"1px solid #EEEEEE",
            "borderRight":"1px solid #EEEEEE",
            "borderBottom":"2px solid #ffffff"

        })
    })
    $nav.children().eq(6).prevAll().mouseleave(function(){
        $(this).find("ul").stop().hide();
        $(this).css({
            "borderLeft":"1px solid #ffffff",
            "borderRight":"1px solid #ffffff",
            "borderBottom":"1px solid #ffffff"
        })
    })

    //图标的样式切换
    $iphone.mouseenter(function(){
        $(this).css("background","url('images/iphone_c.png')")
    })
    $iphone.mouseleave(function(){
        $(this).css("background","url('images/iphon.png')")
    })
    $andriod.mouseenter(function(){
        $(this).css("background","url('images/andriod_c.png')")
    })
    $andriod.mouseleave(function(){
        $(this).css("background","url('images/andriod.png')")
    })

    $ftlink.on("click","i",function(){
        if($flag){
            $(this).parent().find("p").eq(1).stop().slideDown();
            $(this).css("background","url('images/ft_link_up.png')")
            $flag=false;
        }else{
            $(this).parent().find("p").eq(1).stop().slideUp();
            $(this).css("background","url('images/ft_link_down.png')")
            $flag=true
        }

    })
    //footer img透明度的改变
    $ftpic.find("img").hover(function(){
        $(this).stop().fadeTo(200,1);
    },function(){
        $(this).stop().fadeTo(200,0.5);
    })

    //nav ajax 获取内容
    $.ajax({
        "type":"get",
        "url":"json/map.json",
        success:function(msg){
            $.each(msg,function(index,items){
                var $div=$("<div></div>");
                var $partLists=items.partList;
                $mapL.append($div);
                //console.log($partLists)
                $.each($partLists,function(index,items){
                    var $dl=$("<dl><dt>"+items.title+"</dt></dl>");
                    $div.append($dl);
                    var $lists=items.list;
                    $.each($lists,function(index,items){
                        var $dd=$("<dd><a href='"+items.href+"'>"+items.name+"</a></dd>");
                        $dl.append($dd);
                    })
                })

            })
        }
    })
    //sidebar 移入事件
    $sidebar.find("li").mouseenter(function(){
        $(this).css("background","#CF1F3F");
        $(this).find("p").stop().show().stop().animate({"right":"35px"},300)
    })
    $sidebar.find("li").mouseleave(function(){
        $(this).css("background","")
        $(this).find("p").stop().hide().animate({"right":"70px"},300);
    })
    //进货车hover事件以及点击跳转
    $(".shop").hover(function(){
        $(this).css({
            "background":"#CF1F3F",
            "cursor":"pointer"
        });
    },function(){
        $(this).css({
            "background":"",
            "cursor":"pointer"
        })
    })
    $(".shop").click(function(){
        window.location.assign("shopping.html")
    })

    //返回顶部
    $("#turnback").click(function(){
        $('html,body').stop().animate({
            scrollTop:0
        }, 300)

    })

    //商品店铺切换
    $("#change_good").hover(function(){
        $("#change_shop").stop().show()
    },function(){
        $("#change_shop").stop().hide()
    })
    $("#change_shop").mouseenter(function(){
        $(this).stop().show();
    })
    $("#change_shop").mouseleave(function(){
        $(this).stop().hide();
    })


    //数量增加及减少
    var $minus=$(".hd_minus");
    var $plus=$(".hd_plus");
    $minus.click(function(){
        var $num=$(this).parent().find(".j_amount");
        $num.val($num.val()-1);
        if($num.val()<=0) {
            $num.val(0)
        }
        $(".j_sum").html($(".cart_good_p").html()*$(".j_amount").val())
        if($(".getall").prop("checked")==true){
            $(".j_goodsamount").html($(".j_amount").val())
            $(".j_sum_money").html($(".j_sum").html())
        }
    })
    $plus.click(function(){
        var $num=$(this).parent().find(".j_amount")
        var $limit=parseInt($(this).parent().parent().find(".hd_sizelimit").html())
        $num.val(Number($num.val())+1);
        if($num.val()>$limit){
            $num.val($limit)
        }

        $(".j_sum").html($(".cart_good_p").html()*$(".j_amount").val())
        if($(".getall").prop("checked")==true){
            $(".j_goodsamount").html($(".j_amount").val())
            $(".j_sum_money").html($(".j_sum").html())
        }
    })

    //根据cookie改变样式
    var reg=/^user/
    var $cookie=cookie();
    $.each($cookie,function(key,val){
        if(reg.test(key)){
            var $val= $.parseJSON(val);
            if($val.islogin=="true"){
                $(".welcome").html("Hi, "+$val.user+"&nbsp;&nbsp;欢迎来到衣联&nbsp;&nbsp;"+"<a javascript:; class='logout'>退出</a>")
                //显示购物车 获取里面的cookie
                var $regg=/^good/;
                var $regs=/^user/;
                $.each($cookie,function(key1,val1){
                    if($regg.test(key1)){
                        var $gval= $.parseJSON(val1);
                        var $div1=$("<div class='clearfix'><dl><dt><a href='detail.html'><img src='"+$gval.url+"'/></a></dt><dd class='my_good_intr'><p class='my_good_name'><a href='detail.html' target='_blank'>"+$gval.name+"</a></p><p class='my_good_sema'>已选<span class='my_amount'>"+$gval.num+"</span>&times;<span>"+$gval.size+"</span></p></dd><dd class='my_good_pri'><b>￥&nbsp;</b><span class='my_price'>"+$gval.num*$gval.price+"</span></dd></dl></div>");
                        $(".blan_main").append($div1);
                        $(".title").stop().show();
                        $(".total").stop().show();
                    }else{
                        $(".title").stop().hide();
                        $(".total").stop().hide();
                    }
                })
                //计算总值
                var $t_amount=0
                var $t_money=0;
                $(".my_amount").each(function(index1,item1){
                    $t_amount+=parseInt($(item1).html())
                })
                $(".my_price").each(function(index2,item2){
                    $t_money+=parseInt($(item2).html());
                })
                $(".t_amount").html($t_amount);
                $(".t_pri").html($t_money)
                $(".logout").click(function(){
                    var $val_c='{"user":"'+$val.user+'","password":"'+$val.password+'","islogin":"false"}'
                    cookie("user"+$val.user,$val_c,1)
                    window.location.reload()
                })
            }else{
                $(".welcome").html("Hi,欢迎来到衣联&nbsp;<a href='login.html'>请<span>登录&nbsp;</span></a>|<a href='register.html'><span>&nbsp;免费注册</span></a></p>");
                $(".blancket").html("");
            }
        }
    })




})