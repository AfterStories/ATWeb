
	//导航按钮切换
	$('#DownLoadNav li').click(function(){

		$(this).addClass('downshow').siblings().removeClass('downshow');
				
	})


	//tab内容切换
	$('#DownLoadNav li').click(function(){
		var cur = $(this).index();
		$('.TabBox').eq(cur).show().siblings('.TabBox').hide();
	})

