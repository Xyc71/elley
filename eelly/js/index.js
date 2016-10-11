$(document).ready(function(){
    var $search_btn=$("#index_btn");
    var $fix_search=$(".fix_search");
    var $secLeft=$(".sec_left");
    var $secLis=$secLeft.children().eq(2).prevAll();
    var $market=$(".market");
    var $mask=$market.find("span");
    var $hot=$(".hot");
    var $menuBox=$(".menu_box");
    var $menuAll=$(".menuall");
    var $secPic=$(".sec_mpic");
    var $baiyechuang=$(".secpart");
    var $list=$(".list");
    var $secb_rwidth=$list.children().eq(0).outerHeight(true);
    var $secb_i=0;

    //搜索图标的样式变换
    $search_btn.mouseenter(function(){
        $search_btn.css("background","url('images/searchin_btnc.png')")
    })
    $search_btn.mouseleave(function(){
        $search_btn.css("background","url('images/searchin_btn.png')")
    })
    //fix_search的出现消失
    window.onscroll=function(){
        var h=document.body.scrollTop||document.documentElement.scrollTop;
        if(h>300){
            $fix_search.css("display","block");
        }else{
            $fix_search.stop().hide();
        }
    }
    //seation a下的导航栏效果
    //点击li 背景色改变
    $secLis.eq(0).hover(function(){
        $(this).css("background","#303345")
        $secLis.eq(1).css("background","#EE2346");
            $market.stop().show().stop().animate({"width":632},300,function(){
                $mask.stop().fadeOut(100)
            })
    },function(){
        $(this).css("background","#E11639")
        $secLis.eq(1).css("background","#303345");
        $mask.stop().fadeIn(100,function(){
            $market.stop().animate({"width":205},300,function(){
                $market.stop().hide();
                $hot.stop().show();
            })
        })

    })

    //sectiona导航栏的ajax获取
    $.ajax({
        "type":"get",
        "url":"json/hot.json",
        success:function(msg){
            $.each(msg,function(index,items){
                var $dl=$("<dl><dt><a href='"+items.href+"'>"+items.marketName+"</a></dt></dl>")
                $hot.append($dl);
                var $lists=items.list;
                $.each($lists,function(index,items){
                    var $dd=$("<dd><a href='"+items.href+"'>"+items.name+"</a></dd>")
                    $dl.append($dd)
                })
            })
        }
    })
    $.ajax({
        "type":"get",
        "url":"json/market.json",
        success:function(msg){
            $.each(msg,function(index,items){
                var $dl=$("<dl><dt><a href='"+items.href+"'>"+items.marketName+"</a></dt></dl>")
                $market.append($dl);
                var $lists=items.list;
                $.each($lists,function(index,items){
                    var $dd=$("<dd><a href='"+items.href+"'>"+items.name+"</a></dd>")
                    $dl.append($dd)
                })
            })
        }
    })
    //ajax获取menubox
    $.ajax({
        "type":"get",
        "url":"json/nav.json",
        success:function(msg){
            $.each(msg,function(index,items){
                var $div=$("<div></div>");
                $menuBox.append($div);
                var $partLists=items.partList;
                $.each($partLists,function(index,items){
                    var $dl=$("<dl><dt><img src='"+items.url+"'><span></span>"+items.title+"</dt></dl>")
                    $div.append($dl);
                    var $lists=items.list;
                    $.each($lists,function(index,items){
                        var $dd=$("<dd></dd>")
                        var $dl1=$("<dl><dt>"+items.typeName+"</dt></dl>")
                        var $dd1=$("<dd></dd>");
                        $dl.append($dd);
                        $dd.append($dl1);
                        $dl1.append($dd1)
                        var $typeLists=items.typeList;
                        $.each($typeLists,function(index,items){

                            var $a=$("<a href='"+items.href+"'>"+items.name+"</a>")


                            $dd1.append($a)
                        })
                    })
                })
            })
        }
    })
    //实现menuBox的出现消失
    $menuAll.mouseenter(function(){
        $menuBox.stop().slideDown("slow");
    })
    $menuAll.mouseleave(function(){
        $menuBox.stop().slideUp("slow");
    })
    //自动轮播图
    $secPic.move({
        list:[
            {
                url:'images/index_lun1.jpg',
                href:'#'
            },
            {
                url:'images/index_lun2.jpg',
                href:'#'
            },
            {
                url:'images/index_lun3.jpg',
                href:'#'
            },
            {
                url:'images/index_lun4.jpg',
                href:'#'
            },
            {
                url:'images/index_lun5.jpg',
                href:'#'
            }
        ]
    })
    //百叶窗效果
    $baiyechuang.children("li").mouseenter(function(){
        $(this).stop().animate({"width":706},600).siblings().stop().animate({"width":66},600)
        $(this).siblings().find(".sec_mask").css({
            "opacity": 0.3,
            "filter": "alpha(opacity:30)"
        })
    })
    $baiyechuang.children("li").mouseleave(function(){
        $baiyechuang.children("li").stop().animate({"width":194},600);
        $baiyechuang.find(".sec_mask").css({
            "opacity": 0,
            "filter": "alpha(opacity:0)"
        })
    })
    //走货滚动效果
    setInterval(function(){
        $secb_i++;
        if($secb_i==$list.children().length*3/4){
            $secb_i=1;
            $list.css("top",16)
        }
        $list.animate({"top":-$secb_i*$secb_rwidth+16},300)
    },3000)
    //choice点击更多按钮样式的改变
    $(".ch_more").hover(function(){
        $(this).css({
            "background":"#ffffff",
            "color":"#000000"
        })
    },function(){
        $(this).css({
            "background":"",
            "color":"#ffffff"
        })
    })
    //choice 图片下掉
    $(".ch_mainb").hover(function(){
        $(this).children(".ch_maintop").animate({"height":112},300)
    },function(){
        $(this).children(".ch_maintop").animate({"height":64},300)
    })

    //排行榜
    $(".rand").find(".first").mouseenter(function(){
        $(this).stop().animate({"height":190});
        $(this).nextAll().stop().animate({"height": 33})
    })
    $(".rand").children(".normal").mouseenter(function() {
        $(this).stop().animate({"height": 110})
        console.log($(this).siblings().eq(0))
        $(this).siblings().stop().animate({"height": 33})
        $(this).siblings().eq(0).stop().animate({"height": 113})

    })
    //热销好卖 中间部分
    $(".sellm_main>dl").hover(function(){
        $(this).find(".sellm_enter").stop().show()
        $(this).find(".sellm_dt").stop().animate({"width":80},300)
        $(this).find(".sellm_dd").stop().animate({"width":294},300)
        var $self=$(this)
        $(this).find(".sellm_show").stop().hide(0,function(){
            $self.find(".sellm_dd").stop().animate({"width":294},300,function(){
              $self.find(".sellm_hide").stop().show();
            })
        })
    },function(){
        $(this).find(".sellm_enter").stop().hide()
        $(this).find(".sellm_dt").stop().animate({"width":148},300)
        var $self=$(this)
        $(this).find(".sellm_hide").stop().hide(function(){
                $self.find(".sellm_dd").stop().animate({"width":210},300,function(){
                    $self.find(".sellm_show").stop().show();
                });
        })
    })

    //talk中间部分
    $(".talk_mcon").children("li").hover(function(){
        $(this).css("background","#f1f1f1")
    },function(){
        $(this).css("background","")
    })

    //尾部的tab切换部分
    $(".change_btn").children("li").mouseenter(function(){
        $(this).css({
            "border": "1px solid #d9d9d9",
            "border-top":"2px solid #EE2346",
            "border-bottom":"1px solid #ffffff",
            "background": "#ffffff"
        }).siblings().css({
            "border": "1px solid transparent",
            "background":"#fafafa"
        })
        $(".change_list").children().eq($(this).index()).stop().show().siblings().stop().hide();
    })

    //动态创建图片
    $.ajax({
        "type":"get",
        "url":"json/index_img.json",
        success:function(msg){
            $.each(msg,function(index,items){
                var $dl=$("<dl class='rec_dl'></dl>");
                var $a=$("<a href='javascript:;'></a>");
                var $dt=$("<dt class='rec_dt'><img src='"+items.url+"'><div class='rec_mask'><div class='contain'><div class='erweima'></div><p class='name'>"+items.name+"</p><p class='address'>"+items.address+"</p></div></div></dt>")
                var $dd=$("<dd class='rec_dd'></dd>");
                var $pri=$("<div class='pri'></div>");
                var $c_show=$("<div class='c_show'><span class='pri_l'><p class='goodpri'>"+items.goodpri+"</p><span class='bag'>"+items.bag+"</span></span><span class='pri_r'>"+items.pri_r+"</span></div>")
                var $c_hide=$("<ul class='c_hide'></ul>")
                $(".rec_goods").append($dl)//添加的dl加
                $dl.append($a);
                $a.append($dt);
                $a.append($dd);
                $dd.append($pri);
                $pri.append($c_show);
                $pri.append($c_hide);
                var $lis=items.c_hide;
                $.each($lis,function(index,items){
                    var $li=$("<li><p class='hide_pri'>"+items.hide_pri+"</p><span class='hide_bag'>"+items.hide_bag+"</span></li>")
                    $c_hide.append($li);
                })
                var $p=$("<p class='style'>"+items.style+"</p>");
                $dd.append($p);
            })
            $(".rec_dl").hover(function(){
                $(this).css({
                    "box-shadow":"0 0 15px #ccc",
                    "border-color":"#ffffff",
                    "z-index":2
                })
                var $self=$(this);
                $(this).find(".rec_mask").animate({"height":283},100);
                $(this).find(".rec_mask").fadeIn("normal",function(){

                });

                $(this).find(".c_show").hide();
                $(this).find(".c_hide").show();
            },function(){
                $(this).css({
                    "border-color":"#fafafa",
                    "z-index":1,
                    "box-shadow":""
                });
                var $self=$(this);

                $(this).find(".rec_mask").stop().fadeOut("normal",function(){
                    $self.find(".rec_mask").animate({"height":200},300)
                })
                $(this).find(".c_show").show();
                $(this).find(".c_hide").hide();
            })

        }
    })

    //登录后样式的改变
    var $index_reg=/^user/;
    var $index_coo=cookie();
    $.each($index_coo,function(key,val){
        if($index_reg.test(key)){
            var $icoo= $.parseJSON(val);
            if($icoo.islogin=="true"){
                $(".index_show").stop().hide();
                $(".index_hide").stop().show();
                $(".login_name").html("HI , "+$icoo.user);
            }else{
                $(".index_show").stop().show();
                $(".index_hide").stop().hide();
            }
        }
    })


})
