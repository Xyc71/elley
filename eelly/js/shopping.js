$(document).ready(function(){
    //hover图片
    $(".cart_good_small").hover(function(){
        $(".cart_good_big").stop().show()
    },function(){
        $(".cart_good_big").stop().hide()
    })
    //总计




    //取cookie
    var $cookie=cookie()
    var $reg=/^good/;
    var $reg_log=/^user/;
    if($cookie){
        $.each($cookie,function(index,item){
            if($reg_log.test(index)){
                var $islogin= $.parseJSON(item);
                if($islogin.islogin=="true"){
                    $(".j_empty").stop().hide();
                    $.each($cookie,function(key,val){
                        if($reg.test(key)){
                            var $val= $.parseJSON(val);
                            var $dl=$("<dl class='cart_store'><dt><ul class='cart_store_cap'><li><input type='checkbox' class='store_get'/></li><li><a href='javascript:;' class='label_48'>48H</a></li><li><a href='javascript:;'>"+$val.gys+"</a></li><li class='item_condition'>混批条件：混批商品总金额≥258元,或混批货品总件数≥5</li></ul></dt><dd><ul class='cart_good_list'><li><input type='checkbox'/></li><li class='cart_good_desc'><dl><dt class='cart_good_small'><a href='detail.html'><img src='"+$val.url+"'/></a><span class='cart_good_big'><i></i><img src='"+$val.url+"'/></span></dt><dd><p class='cart_good_tt'><a href='detail.html' target='_blank'>"+$val.name+"</a></p><p class='cart_good_nu'>"+$val.id+"</p><p><i class='cart_ret'></i><i class='cart_timer'></i></p></dd></dl></li><li class='cart_good_sema'><table class='guige'><tr><td class='cart_good_se'>"+$val.yangshi+"</td><td class='cart_good_ma'>"+$val.size+"</td></tr></table></li><li class='cart_good_price'>￥<span class='cart_good_p'>"+$val.price+"</span></li><li class='cart_good_amount'><span class='hd_btn hd_minus'></span><span class='hd_btninner'><input type='text' class='j_amount' value='"+$val.num+"'/></span><span class='hd_btn hd_plus'></span></li><li class='cart_good_sum'><p class='j_sum'>"+$val.num*$val.price+"</p></li><li class='cart_good_action'><i class='delete'><input type='hidden' value='"+$val.id+$val.size+"'/></i></li></ul></dd></dl>");
                            $(".jcart").append($dl);
                            $dl.find('.delete').click(function(){
                                cookie('good'+$(this).children('input').val(),'',-1)
                                $(this).parent().parent().parent().parent().remove();
                                location.reload();
                            })
                            $(".cart_sum").stop().show();
                            $(".cart_cap").stop().show();
                            $(".j_empty").stop().hide();
                        }else if($reg.test(key)==false&&$reg_log.test(key)==true){
                            $(".cart_sum").stop().hide();
                            $(".cart_cap").stop().hide();
                            $(".j_empty").stop().show();
                        }
                    })
                }else{
                    $(".cart_sum").stop().hide();
                    $(".cart_cap").stop().hide();
                    $(".j_empty").stop().show();
                }
            }
        })
    }else{
        $(".cart_sum").stop().hide();
        $(".cart_cap").stop().hide();
        $(".j_empty").stop().show();
    }
    //点击全选多选框
    var $getall=$(".getall");
    var $checkbox=$(document).find("input[type=checkbox]");
    var $store_get=$(".store_get");
    $getall.click(function(){
        if($(this).prop("checked")==true){
            $checkbox.prop("checked","true")
            $(".j_js").removeClass("forbid");
            var $goodlist=$(".cart_good_list");
            var $sum=0;
            var $num=0;
            $goodlist.each(function(index,item){
                $sum+=parseInt($(item).find(".j_sum").html())
                $num+=parseInt($(item).find(".j_amount").val())
                console.log($num)
            })
            $(".j_goodsamount").html($num)
            $(".j_sum_money").html($sum)
        }else{
            $checkbox.prop("checked","");
            $(".j_js").addClass("forbid");
            $(".j_goodsamount").html(0)
            $(".j_sum_money").html(0.00)
        }
    })
    //单独点击某一个的框
    var $j_amount=0
    var $j_sum=0;
    $store_get.click(function(){
        var $goods=$(this).parent().parent().parent().siblings()
        if($(this).prop("checked")==true){
            $j_amount+=parseInt($goods.find(".j_amount").val());
            $j_sum+=parseInt($goods.find(".j_sum").html())
            $goods.find("input[type=checkbox]").prop("checked","true")
            $(".j_js").removeClass("forbid");
            $(".j_goodsamount").html($j_amount)
            $(".j_sum_money").html($j_sum)
        }else{
            $goods.find("input[type=checkbox]").prop("checked","");
            $(".j_js").addClass("forbid");
            $(".j_goodsamount").html(0)
            $(".j_sum_money").html(0.00)
        }
    })
})
