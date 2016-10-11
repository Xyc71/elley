$(document).ready(function(){
    //点击出现店铺详情
    $(".det_left").hover(function(){
        $(".det_left_hide").stop().show()
    },function(){
        $(".det_left_hide").stop().hide()
    })
    //放大镜效果以及tab切换
    //tab切换
    var $filter=$(".filter")
    var $btns=$(".hd_mainl_btn");
    var $imgs=$(".hd_mainl_list").find("img");
    $btns.on("mouseenter","li",function(){
        $(this).css("border-color","#e8304e").siblings().css("border-color","#ffffff");
        $imgs.eq($(this).index()).show().siblings("img").hide();
        $(".bigimg").find("img").attr("src",$imgs.eq($(this).index()).attr("src"));
    })
    //放大镜
    var $num=$(".bigimg").innerHeight()/$filter.innerHeight();
    var $numw=$(".bigimg").innerWidth()/$filter.innerWidth();
    $(".hd_mainl_mask").mousemove(function(e){
        //创建滤镜及放大图
        $(".bigimg").stop().show()
        $(".filter").stop().show()
        var ev=window.event||e;
        //清除浏览器默认行为
        window.event?ev.returnValue=false:ev.preventDefault();
        var $posX=(ev.offsetX||ev.layerX)-$filter.innerWidth()/2;
        var $posY=(ev.offsetY||ev.layerY)-$filter.innerHeight()/2;
        if($posX<0){
            $posX=0;
        }else if($posX>$(".hd_mainl_picview").innerWidth()-$filter.innerWidth()){
            $posX=$(".hd_mainl_picview").innerWidth()-$filter.innerWidth();
        }
        if($posY<0){
            $posY=0;
        }else if($posY>$(".hd_mainl_picview").innerHeight()-$filter.innerHeight()){
            $posY=$(".hd_mainl_picview").innerHeight()-$filter.innerHeight();
        }
        $filter.css({
            "left":$posX,
            "top":$posY
        })
        $(".bigimg").find("img").css({
            "left":-$posX*$numw,
            "top":-$posY*$num
        })

    })
    $(".hd_mainl_mask").mouseleave(function(){
        $(".bigimg").stop().hide()
        $(".filter").stop().hide()
    })



    //右半部分固定
    var $h=$(".hd_mainr").offset().top;
    var $limit_h=15908-$(".hd_mainr").innerHeight()
    console.log($(".hd_mainr").innerHeight())
    //选项卡部分点击跳转
    var $tab_h=$(".bd_tabnav").offset().top;
    $(".bd_tabnav").on("click","li",function(){
        $(this).addClass("bd_act").siblings().removeClass("bd_act");
    })
    $(".bd_tabnav").children().eq(0).click(function(){
        $(document).scrollTop($(".bd_tabbox").offset().top)
    })
    $(".bd_tabnav").children().eq(1).click(function(){
        $(document).scrollTop($(".det_tj").offset().top)
    })
    $(".bd_tabnav").children().eq(2).click(function(){
        $(document).scrollTop($(".det_zx").offset().top)
    })
    window.onscroll=function(){
        if($(document).scrollTop()>=$tab_h){
            $(".bd_tabnav").css({
                "position":"fixed",
                "z-index":8,
                "width":"100%"
            })
        }else{
            $(".bd_tabnav").css({
                "position":"relative"
            })
        }
        console.log($limit_h)
        if($(document).scrollTop()>=$h&&$(document).scrollTop()<=$limit_h){
            $(".hd_mainr").css({
                "position":"fixed",
                "z-index":10,
                "top":0,
                "left":'50%',
                'right':0,
                'margin-left':172
            })
        }else if($(document).scrollTop()>=$limit_h){
            $(".hd_mainr").css({
                "position":"absolute",
                "top":14875,
                "left":'50%',
                'right':0,
                'margin-left':172
            })
        }else{
            $(".hd_mainr").css({
                "position":"absolute",
                "top":0,
                "left":'50%',
                'right':0,
                'margin-left':172
            })
        }
    }
    //类似轮播图
    var $md_flag=true;
    var $md_timer=setInterval(change,5000)
    function change(){
        if($md_flag){
            $(".md_hota").stop().hide().siblings().stop().show();
        }else{
            $(".md_hotb").stop().hide().siblings().stop().show();
        }
        $md_flag=!$md_flag
    }

    //文本框获得焦点清空文字
    var $textarea=$("#textarea_f");
    $textarea.focusin(function(){
        $textarea.val("")
    })
    $textarea.focusout(function(){
        $textarea.val("写上你对款式、物流、服务想了解的内容,200字内 :)")
    })

    //存cookie
    $(".addin").click(function(){
        //要先登录才能添加购物车
        var $det_coo=cookie();
        var $det_reg=/^user/;
        $.each($det_coo,function(key,val){
            if($det_reg.test(key)){
                var $reg_val= $.parseJSON(val)
                if($reg_val.islogin=="true"){
                    var $lists=$(".hd_sizelist").children("ul");
                    $lists.each(function(index,item){//遍历每个尺码选项
                        var $id=$("#good_id").html();
                        var $title=$("#good_title").html();
                        var $url=$(".good_url").attr("src");
                        var $ys=$(".bingo").html();
                        var $size=$(item).find(".hd_sizename").html();
                        var $num=$(item).find(".hd_btninner").find("input").val();
                        var $gys="供应商: "+$("#gongying").html();
                        var $price=parseFloat($(".hd_sizepri").html())
                        var $c_val='{"name":"'+$title+'","id":"'+$id+'","url":"'+$url+'","yangshi":"'+$ys+'","size":"'+$size+'","num":"'+$num+'","gys":"'+$gys+'","price":"'+$price+'"}';
                        cookie("good"+$id+$size,$c_val,1);
                    })
                }else{
                    alert("请先登录")
                }
            }

        })

    })
    //前往购物车
    $(".checknow").click(function(){
        var $det_coo=cookie();
        var $det_reg=/^user/;
        $.each($det_coo,function(key,val){
            if($det_reg.test(key)){
                var $reg_val= $.parseJSON(val)
                if($reg_val.islogin=="true"){
                    var $lists=$(".hd_sizelist").children("ul");
                    $lists.each(function(index,item){//遍历每个尺码选项
                        var $id=$("#good_id").html();
                        var $title=$("#good_title").html();
                        var $url=$(".good_url").attr("src");
                        var $ys=$(".bingo").html();
                        var $size=$(item).find(".hd_sizename").html();
                        var $num=$(item).find(".hd_btninner").find("input").val();
                        var $gys="供应商: "+$("#gongying").html();
                        var $price=parseFloat($(".hd_sizepri").html())
                        var $c_val='{"name":"'+$title+'","id":"'+$id+'","url":"'+$url+'","yangshi":"'+$ys+'","size":"'+$size+'","num":"'+$num+'","gys":"'+$gys+'","price":"'+$price+'"}';
                        cookie("good"+$id+$size,$c_val,1);
                        window.location.assign("shopping.html")
                    })
                }else{
                    alert("请先登录")
                }
            }
        })

    })

})
