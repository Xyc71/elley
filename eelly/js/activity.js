$(document).ready(function(){
    $(".community").hover(function(){
        $(this).find("ul").stop().show()
    },function(){
        $(this).find("ul").stop().hide();
    })

    //最大的banner
    $(document).ready(function(){
        var $box=$(".banner");
        var $index=0;
        var $flag=true;
        var $fx=1;
        var $timer=setTimeout(fade,3000)
        //容器样式
        $box.css({
            "position":"relative"
        })
        //存放图片的容器
        var $imglist=$box.children(".imglist");
        $imglist.css({
            "width":"100%",
            "height":"100%",
            "position":"relative"
        })
        var $as=$imglist.find("a")
        var $img=$imglist.find("img").css({
            "display":"block",
            "width":"1920px",
            "height":"100%",
            "position":"absolute",
            "top":0,
            "left":"50%",
            "margin-left":"-960px",
            "opacity":0,
            "filter":"alpha(opacity=0)"
        })
        //第一张图片显示
        $img.eq($index).css({
            "opacity":1,
            "filter":"alpha(opacity=100)"
        })
        //焦点样式
        $(".banner").children(".icon_list").css({
            "position":"relative",
            "height":"100%"
        })
        var $iconList=$(".icon_list");
        $iconList.css({
            "position":"absolute",
            "height":"100%",
            "width":1200,
            "margin-left":"-600px",
            "left":"50%",
            "z-index":1,
            "top":0
        })
        $iconList.find("ul").css({
            "width":"180px",
            "height":"12px",
            "position":"absolute",
            "top":"370px",
            "left":0,
            "overflow":"hidden"
        })
        var $icon=$iconList.find("li")
        $icon.css({
            "height":12,
            "width":12,
            "float":"left",
            "margin-right":5,
            "background":"#ffffff"
        })
        //第一个焦点的样式
        $icon.eq($index).css({
            "background":"#f6254b"
        })
        //左右箭头
        var $l=$("#left");
        var $r=$("#right");
        $l.css({
            "width": 52,
            "height": 52,
            "display": "block",
            "position":"absolute",
            "top":"180px",
            "background":"url('images/left.png')",
            "z-index":9
        })
        $r.css({
            "width": 52,
            "height": 52,
            "display": "block",
            "position":"absolute",
            "top":"180px",
            "right":0,
            "background":"url('images/right.png')",
            "z-index":9
        })

        //让图片淡入淡出
        function fade(){
            $index+=$fx;
            if($index==$img.length){
                $index=0;
            }else if($index==-1){
                $index=$img.length-1
            }

            $as.eq($index).children().stop().animate({
                "opacity":1
            },function(){
                clearTimeout($timer);
                if($flag){

                    $timer=setTimeout(fade,3000)
                }

            })
            //焦点切换
            $icon.eq($index).css({
                "background":"#f6254b"
            }).siblings().css({
                "background":"#ffffff"
            })
            $as.eq($index).siblings().children().stop().animate({
                "opacity":0
            })
        }
        //焦点切换
        $icon.click(function(){
            $index=$(this).index()-1;
            fade()
        })
        //hoverbanner
        $(".banner").hover(function(){
            clearTimeout($timer)
            $flag=false;
        },function(){

            $flag=true;
            $timer=setTimeout(fade,3000);
        })
        //左右箭头事件
        $l.hover(function(){
            $(this).css({"background":"url('images/left_hover.png')"})
        },function(){
            $(this).css({"background":"url('images/left.png')"})
        })
        $r.hover(function(){
            $(this).css({"background":"url('images/right_hover.png')"})
        },function(){
            $(this).css({"background":"url('images/right.png')"})
        })
        $l.click(function(){
            $fx=-1;
            fade();
        })
        $r.click(function(){
            $fx=1;
            fade()
        })

    })

    //tab切换中的轮播图
    var list = [
        {
        imgUrl: 'images/floor1_change_img1.jpg',
        href: '#'
        },
        {
        imgUrl: 'images/floor1_change_img2.jpg',
        href: '#'
        },
        {
        imgUrl: 'images/floor1_change_img3.jpg',
        href: '#'
        }
    ]
    $(".week_bigcontent").eq(0).find(".bigcon_m").fade({
        url: list,
        boxWid:322,
        boxHei:500
    })

    //tab切换样式
    $(".week_bigicon").children().mouseenter(function(){
        $(this).children("a").css("border-color","#f6254c")
        $(this).siblings().children("a").css("border-color","#e5e5e5")
        $(".week_bigcontent").eq($(this).index()).fadeIn().siblings().not(".week_bigicon").fadeOut();
        $(".week_bigcontent").eq($(this).index()).find(".bigcon_m").fade({
            url: list,
            boxWid:322,
            boxHei:500
        })
    })


    //ajax 导入楼层
    $.get("json/floor.json",function(msg){
        $.each(msg,function(index,item){
            $(".floor>.layout").append("<div class='floormain block'><ul class='floor_up'></ul><ul class='floor_down'></ul></div>")
            //console.log(item.floorlist[0])//获取到每层的上半部分
            //console.log(item.floorlist[1])//获取到每层的下半部分
            //遍历每层的上半部分的partlist创建li
            for(var i in item.floorlist[0].partlist){
                $(".floor_up").eq(index).append("<li></li>")
            }
            //给每层的上半部分的第一个li添加内容
            var $tarea1=item.floorlist[0].partlist[0]
            $(".floor_up").eq(index).children().eq(0).append("<a href='"+$tarea1.href+"'><img src='"+$tarea1.url+"'></a>")
            //给每层的上半部分的第二个li添加内容
            var $tarea2=item.floorlist[0].partlist[1]
            $(".floor_up").eq(index).children().eq(1).append("<a href='"+$tarea2.href+"'><img src='"+$tarea2.url+"'></a>")
            var $tarea3=item.floorlist[0].partlist[2];
            $.each($tarea3.list,function(index1,item1){
                $(".floor_up").eq(index).children().eq(2).append("<dl><dt><a href='"+item1.href+"'><img src='"+item1.url+"'></a><div class='floor_mask'><div class='getbutton'><a href='javascript:;' class='getnow'>立即抢批</a></div></div></dt><dd><i class='pfj'>批发价</i>&nbsp;&nbsp;<i class='p_price'>"+item1.p_price+"</i><br><span class='locate_img'></span>&nbsp;&nbsp;<i class='pfj'>"+item1.locate+"</i></dd></dl>")
            })

            //遍历每层的下半部分创建li
            for(var i in item.floorlist[1].partlist){
                $(".floor_down").eq(index).append("<li></li>")
            }

            var $barea1=item.floorlist[1].partlist[0];
            $(".floor_down").eq(index).children().eq(0).addClass("floor_map")
            $(".floor_map").eq(index).append("<div class='floor_search'></div>")
            $.each($barea1.as,function(index2,item2){
                $(".floor_search").eq(index).append("<a href='"+item2.href+"' style='background:url(\""+item2.background+"\") no-repeat right center'>"+item2.text+"</a>")
            })
            $(".floor_map").eq(index).append("<a href='"+$barea1.href+"'><img src='"+$barea1.url+"'></a>")

            var $barea2=item.floorlist[1].partlist[1];
            $.each($barea2.list,function(index3,item3){
                $(".floor_down").eq(index).children().eq(1).append("<dl><dt><a href='"+item3.href+"'><img src='"+item3.url+"'></a><div class='floor_mask'><div class='getbutton'><a href='javascript:;' class='getnow'>立即抢批</a></div></div></dt><dd><i class='pfj'>批发价</i>&nbsp;&nbsp;<i class='p_price'>"+item3.p_price+"</i><br><span class='locate_img'></span>&nbsp;&nbsp;<i class='pfj'>"+item3.locate+"</i></dd></dl>")
            })

        })
        //链接的hover事件
        $(".floor_search").find("a").hover(function(){
            $(this).stop().animate({"left":30},300)
        },function(){
            $(this).stop().animate({"left":0},300)
        })
        //每个dl上的hover事件
        $(".floor").find("dl").hover(function(){
            $(this).find(".floor_mask").stop().show()
        },function(){
            $(this).find(".floor_mask").stop().hide()
        })
    })

    //控制滑块的出现消失以及效果
    $(".control").find("a").hover(function(){
        $(this).css({"font-size":"14px","padding":"5px 0"})
    },function(){
        $(this).css({"font-size":"12px","padding":""})
    })
    window.onscroll=function(){
        if($(document).scrollTop()>=$(".block").eq(0).offset().top){
            $(".control").stop().show();
        }else{
            $(".control").stop().hide();
        }
    }

    //点击楼层跳转
    $(".control").on("click","li",function(){
        var $index = $(this).index();
        $('html,body').stop().animate({
            scrollTop:$('.block').eq($index).offset().top
        }, 100)

    })
})