$(document).ready(function(){
    //获取searchnav下的下拉菜单内容
    $.ajax({
        "type": "get",
        "url": "json/searchnav1.json",
        success: function (msg) {
            $.each(msg, function (index, items) {
                var $dl = $("<dl><dt><a href='" + items.href + "'>" + items.title + "</dt></dl>");
                $(".woman_list").append($dl);
                var $lists = items.list;
                $.each($lists, function (index, items) {
                    var $dd = $("<dd><a href='+items.href+'>" + items.type + "</a></dd>");
                    $dl.append($dd)
                })
            })
        }
    })
    $.ajax({
        "type": "get",
        "url": "json/searchnav2.json",
        success: function (msg) {
            $.each(msg, function (index, items) {
                var $dl = $("<dl><dt><a href='" + items.href + "'>" + items.title + "</dt></dl>");
                $(".dress_list").append($dl);
                var $lists = items.list;
                $.each($lists, function (index, items) {
                    var $dd = $("<dd><a href='+items.href+'>" + items.type + "</a></dd>");
                    $dl.append($dd)
                })
            })
        }
    })

    //显示womanlist dresslist
    $(".list_searchnav").children("li").eq(1).hover(function(){
        $(".woman_list").stop().slideDown()
    },function(){
        $(".woman_list").stop().slideUp()
    })
    $(".list_searchnav").children("li").eq(2).hover(function(){
        $(".dress_list").stop().slideDown()
    },function(){
        $(".dress_list").stop().slideUp()
    })
    //点击更多按钮slide
    $("#attr_more").hover(function(){
        $(this).css({
            "color":"#DD465E",
            "border-color":"#DD465E"
        })
    },function(){
        $(this).css({
            "color":"#000000",
            "border-color":"#e5e5e5"
        })
    })
    var $flag=true;
    $("#attr_ty").find("#attr_more").click(function(){
        if($flag){
            $("#attr_more").find("span").html("收起")
            $("#attr_more").find("i").css("background-position","-60px -70px")
            $("#attr_ty").animate({"height":92},300);
            $("#attr_ty").find(".attr_r").animate({"height":92},300);
            $(".attr_group").animate({"height":257},300);
            $flag=!$flag;
        }else{
            $("#attr_more").find("span").html("更多")
            $("#attr_more").find("i").css("background-position","-50px -70px")
            $("#attr_ty").animate({"height":40},300);
            $("#attr_ty").find(".attr_r").animate({"height":40},300);
            $(".attr_group").animate({"height":205},300);
            $flag=!$flag;
        }
    })
    //点击更多样式
    $(".list_more").hover(function(){
        $(this).find("span").css("color","#DD465E")
    },function(){
        $(this).find("span").css("color","#000000")
    })
    var $flag1=true
    $(".list_more").click(function(){
        if($flag1){
            $(this).find("span").html("收起选项");
            $(this).find("i").css("background-position","-60px -70px")
            $(".attr_group").animate({"height":246},300);
            $flag1=!$flag1;
        }else{
            $(".list_more").find("span").html("更多选项");
            $(this).find("i").css("background-position","-50px -70px")
            $(".attr_group").animate({"height":205},300);
            $flag1=!$flag1;
        }
    })

    //价格区间文本框点击事件
    $(".pricearea").find("input").focusin(function(){
        $(".price_expand").stop().show()
    })
    $(".pricearea").find("input").focusout(function(){
        $(".price_expand").stop().hide()
    })
    //起定量文本框点击
    //价格区间文本框点击事件
    $(".order").find("input").focusin(function(){
        $(".order_expand").stop().show()
    })
    $(".order").find("input").focusout(function(){
        $(".order_expand").stop().hide()
    })

    //searchlist hover事件
    $(".list_hover").hover(function(){
        $(this).css({
            "background":"#ee2346",
        })
        $(this).find("a").css("color","#ffffff");
    },function(){
        $(this).css({
            "background":"",
        })
        $(this).find("a").css("color","#666666");
    })
    //货源的的出现消失
    $(".place").mouseenter(function(){
        $(".place_hide").stop().show();
    })
    $(".place").mouseleave(function(){
        $(".place_hide").stop().hide();
    })
    //货源地tab切换
    $(".place_btn").find("a").click(function(){
        $(this).css("background","#ffffff").siblings().css("background","#f5f5f5");
        $(".place_list").find("ul").eq($(this).index()).show().siblings().hide();
    })
    //动态创建图片 并添加特效
    $.ajax({
        "url": "json/img.json",
        "type": "get",
        success: function (msg) {
            //分页创建图片列表
            var $num=80;
            var $pages=Math.ceil(msg.length/$num);

            for(var i=0;i<$pages;i++){
                $(".page").find("ul").append("<li class='page_btn'><a href='javascript:;'>"+(i+1)+"</a></li>")
            }
            $(".page").find("ul").append("<li class='page_up'><a href='javascript:;'>上一页</a></li>")
            $(".page").find("ul").append("<li class='page_down'><a href='javascript:;'>下一页</a></li><span class='page_all'>共"+$pages+"页</span>")
            createImg();
            //分页点击事件
            $(".page_ul").on("click",".page_btn",createImg);

            function createImg() {
                var $index = $(this).index() >= 0 ? $(this).index() : 0;
                changebtn();
                $(".imgBox").empty();
                $(document).scrollTop(0);
                create();
                function create(){
                    for (var j = $index * $num; j < $num * ($index + 1); j++) {
                        if (msg[j]) {
                            var $div = $("<div class='imgmain'></div>")
                            var $contain = $("<div class='img_contain'></div>")
                            var $dl = $("<dl class='img_show'><dt class='img_dt'><a href='detail.html'><img src='" + msg[j].url + "'><a href='detail.html' class='size_color'>" + msg[j].size_color + "</a></a></dt></dl>")
                            var $dd = $("<dd class='img_dd'><p class='price_cont'><span class='font'>" + msg[j].font + "</span><a href='javascript:;' class='shop_car'></a></p><p class='descript'><a href='detail.html'>" + msg[j].descript + "</a></p><p class='detail'><a href='detail.html'>" + msg[j].detail1 + "</a><i>" + msg[j].detail2 + "</i></p><p class='store'><a href='detail.html'>" + msg[j].store + "</a></p></dd>");
                            var $imghide = $("<div class='img_hide'></div>");
                            var $h3 = $("<h3 class='title'><a href='javascript:;' class='sameser'>" + msg[j].sameser + "</a><a href='javascript:;' class='allgood'>" + msg[j].allgood + "</a></h3>");
                            $(".imgBox").append($div);
                            $div.append($contain);
                            $contain.append($dl)
                            $dl.append($dd);
                            $contain.append($imghide);
                            $imghide.append($h3);
                            var $lists = msg[j].list;
                            $.each($lists, function (index, items) {
                                var $sdl = $("<dl class='s_img'><dt><a href='javascript:;'><img src='" + items.url + "'/></a></dt></dl>")
                                var $sdd = $("<dd><span class='font'>" + items.font + "</span><a href='" + items.href + "' class='shop_car'></a></dd>")
                                $imghide.append($sdl);
                                $sdl.append($sdd)
                            })
                        }
                    }
                }

                //点击下一页
                $(".page_down").click(function(){
                    console.log($index)
                    $index++;
                    if($index>$pages-1){
                        $index=$pages;
                    }
                    $(document).scrollTop(0);
                    changebtn();
                    $(".imgBox").empty();
                    create()

                })
                //点击上一页
                $(".page_up").click(function(){
                    console.log($index)
                    $index--;
                    if($index<0){
                        $index=0;
                    }
                    $(document).scrollTop(0);
                    changebtn();
                    $(".imgBox").empty();
                    create()

                })
                //hover事件
                $(".imgmain").hover(function () {
                    $(this).css("z-index", 1)
                    $(this).find(".img_contain").css({
                        "box-shadow": "0 0 15px #cccccc"
                    })
                    $(this).css('overflow', 'visible')
                }, function () {
                    $(this).css("z-index", 0)
                    $(this).find(".img_contain").css({
                        "z-index": "0",
                        "box-shadow": ""
                    })
                    $(this).css('overflow', 'hidden')
                })
                function changebtn(){
                    $(".page_btn").eq($index).css("background", "#ee2346").siblings().css("background", "#ffffff")
                    $(".page_btn").find("a").css("color", "#000000")
                    $(".page_btn").eq($index).find("a").css("color", "#ffffff")
                }
            }
        }

    })



    //浏览记录切换
    $(".page_right").click(function(){
        $(".like_list").find("ul").css("top",-453);
    })
    $(".page_left").click(function(){
        $(".like_list").find("ul").css("top",0);
    })

    //动态创建猜你喜欢的内容
    $.ajax({
        "type":"get",
        "url":"json/guess.json",
        success:function(msg){

            var $num=10;
            var $pages=Math.ceil(msg.length/$num);
            var $index=0;
            console.log($pages)
            for(var i=0;i<$pages;i++){
                $(".like_ball").append("<a href='javascript:;'></a>")
            }
            //左右箭头的出现
            $(".guess").hover(function(){
                $("#turn_l").fadeIn()
                $("#turn_r").fadeIn()
            },function(){
                $("#turn_l").fadeOut()
                $("#turn_r").fadeOut()
            })
            create();
            changebtn();
            //分页加载事件 点击向右箭头
            $("#turn_r").click(function(){
                $index++;
                if($index>$pages-2){
                    $index=$pages-1;
                }
                create();
                changebtn();
            })
            //点击向左的箭头
            $("#turn_l").click(function(){
                $index--;
                console.log($index)
                if($index<0){
                    $index=0;
                }
                create();
                changebtn();
            })
            function create(){
                $(".like_move").empty();
                for(var j=$index*$num;j<$num*($index+1);j++){
                    if(msg[j]){
                        var $dl=$("<dl></dl>")
                        var $dt=$("<dt><a href='"+msg[j].href+"'><img src='"+msg[j].url+"' /></a></dt>")
                        var $dd=$("<dd><span>"+msg[j].span+"</span><a href='"+msg[j].href2+"'></dd>")
                        $(".like_move").append($dl)
                        $dl.append($dt);
                        $dl.append($dd)
                    }
                }
            }
            function changebtn(){
                $(".like_ball").find("a").eq($index).addClass("ballactive").siblings().removeClass("ballactive");
            }
        }
    })

})


