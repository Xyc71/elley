function cookie(name,value,end_day){
	//判断是否为获取/添加
	if(name && value!=undefined){  //判断是否传入value
		var date = new Date();
		//设置过期时间（如果为负值则是删除某条cookie）
		date.setDate(date.getDate() + end_day*1);  
		document.cookie = name + '=' + escape(value) + (end_day?'; expires='+date.toString():'');
	}else if(name||arguments.length==0){
		//获取cookie
		if(document.cookie){
			var coo = document.cookie;
			//先将cookie拆分为一维数组
			var arr1 = coo.split('; ');
			var arr2 = [];
			//再将cookie拆分为二位数组
			for(var i = 0;i < arr1.length;i++){
				arr2.push(arr1[i].split('='));
			}
			//判断是否获取单个cookie/所有cookie
			if(name){
				//返回具体某一条cookie 的值
				for(var j = 0;j < arr2.length;j++){
					if(arr2[j][0]==name){
						return unescape(arr2[j][1]);
					}
				}
			}else{
				//以对象的形式返回所有cookie
				var obj = {};
				for(var j = 0;j < arr2.length;j++){
					obj[arr2[j][0]] = unescape(arr2[j][1]);
				}
				return obj;
			}
		}else{
			return null;
		}
	}
}