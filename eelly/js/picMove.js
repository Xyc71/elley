(function($){
	$.fn.extend({
		move:function(opt){
			//设置默认值
			var settings = {
				spacing:3000,
				speed:300,
				size:10
			}
			//合并参数
			var o = $.extend(settings,opt);
			//缓存容器对象
			var $box = this;
			//容器样式补充
			$box.css({
				position:'relative',
				overflow:'hidden'
			});
			var $w = $box.innerWidth();
			var $h = $box.innerHeight();
			//创建滚动元素
			var $ball = $('<ul></ul>');
			
			//设置滚动元素样式
			$ball.css({
				width:(o.list.length+1)*$w,
				overflow:'hidden',
				position:'absolute',
				left:0,
				top:0,
				listStyle:'none'
			})
			//创建焦点容器
			var $btns = $('<div></div>');
			$btns.css({
				position:'absolute',
				width:(o.size+5)*o.list.length,
				zIndex:10,
				bottom:12,
				left:($w-(o.size+5)*o.list.length)/2,
				overflow:'hidden'
			})
			//创建左右按钮
			var $prev = $('<a id="prev" href="javascript:void(0);">&lt;</a>');
			var $next = $('<a id="next" href="javascript:void(0);">&gt;</a>');
			//创建图片
			$.each(o.list,function(index,items){
				$ball.append('<li><a href="'+items.href+'"><img src="'+items.url+'" alt=""/></a></li>');
				$btns.append($('<span>'));
			})
			//复制第一张图
			$ball.append($ball.children().first().clone());
			//元素插入
			$box.append($ball,$btns,$prev,$next);

			//设置图片样式
			$ball.children().css({
				width:$w,
				height:$h,
				float:'left'
			}).find('a,img').css({
				width:'100%',
				height:'100%',
				display:'block'
			})
			//设置焦点样式
			$btns.children().css({
				float:'left',
				width:o.size,
				height:o.size,
				marginRight:5,
				background:'#ffffff',
				borderRadius:'50%',
				opacity:0.3
			}).eq(0).css('opacity',1);
			//设置左右样式
			$box.children('a').css({
				fontSize:30,
				padding:10,
				position:'absolute',
				top:($h-50)/2,
				color:'#ffffff',
				fontFamily:"黑体",
				textDecoration:'none',
				background:'rgba(0,0,0,0.4)',
				display:'none'
			}).filter('#next').css('right',0).siblings('#prev').css('left',0)
			//自动轮播
			var $index = 0;
			var $f = 1;
			var $flag = true;
			var $timer = setTimeout(move,o.spacing);

			//滚动函数
			function move(){
				$index += $f;
				//循环条件

				if($index==o.list.length+1){
					$index = 1;
					$ball.css('left',0);
				}else if($index==-1){
					$index = o.list.length-1;
					$ball.css('left',-$w*o.list.length)
				}
				//图片轮播
				$ball.stop().animate({
					left:-$index*$w
				},o.speed,function(){
					clearTimeout($timer);
					if($flag){
						$timer = setTimeout(move,o.spacing);
					}
				})
				//焦点跟随
				$btns.children().eq($index%o.list.length).stop().fadeTo(o.speed,1).siblings().stop().fadeTo(o.speed,0.3);
			}
			//鼠标滑入/滑出

			$box.hover(function(){
				$flag = false;
				$('#prev,#next').stop().fadeIn(100);
				clearTimeout($timer);
			},function(){
				$flag = true;
				$('#prev,#next').stop().fadeOut(100);
				$timer = setTimeout(move,o.spacing);
			})
			//焦点切换
			$btns.on('click','span',function(){
				var $i = $(this).index()
				if($i<=o.list.length&&$index==o.list.length){
					$ball.css('left',0);
				}
				$index  = $i;
				$ball.stop().animate({
					left:-$index*$w
				},o.speed)
				//焦点跟随
				$(this).stop().fadeTo(o.speed,1).siblings().stop().fadeTo(o.speed,0.3);
			})

			//左右切换
			$('#prev,#next').click(function(){
				var $id = $(this).attr('id');
				if($id=='prev'){
					$f = -1;
				}else{
					$f = 1;
				}
				move();
			})
		}
	})
}(jQuery));