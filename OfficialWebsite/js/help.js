
$(document).ready(function(){ 
resizeHeight()


var Language = getCookie("Language");
if (Language) {
  console.log(Language)
}else{
  Language = "zh"
}


layui.use(['layer', 'element'], function(){
  var layer = layui.layer;
var element = layui.element();

element.on('collapse', function(data){
  console.log(data.show); //得到当前面板的展开状态，true或者false
  resizeHeight();
});


});        
      
    $("#header").load("lib/header/header.html",function(){
    });

$("footer").load("lib/footer/footer.html",function(){
    
    $("body").cloudLang({lang: Language, file: "lib/js/lang/lang-resource.xml"});

    $("#LanguagePic img").attr("src","images/"+Language+".png");  


    $(".changeLangSet").val(Language);

    $('.changeLangSet').dropkick({
  
        change: function (value) {
          
          $("body").cloudLang({lang: value, file: "lib/js/lang/lang-resource.xml"});

            $("#LanguagePic img").attr("src","images/"+value+".png");

            CreateCookie("Language", value, 30)

        }

      });
  })





  //左侧导航按钮切换
  $('.NavLi').click(function(){
    $(this).addClass('active').siblings().removeClass('active');
    resizeHeight()
    
  })


  //tab内容切换
  $('.NavLi').click(function(){
    var cur = $(this).index();
    $('.layui-collapse').eq(cur).show().siblings('.layui-collapse').hide();
  })



})
 




function resizeHeight(){

    var resizeheight = $("#HelpBox").height() ;
    if (resizeheight<800) {
      $("#HelpNav").height(800)
    }else{
      $("#HelpNav").height(resizeheight)
    }
    
}

function getSessionId(){  
    var c_name = 'JSESSIONID';  
    if(document.cookie.length>0){  
       c_start=document.cookie.indexOf(c_name + "=")  
       if(c_start!=-1){   
         c_start=c_start + c_name.length+1   
         c_end=document.cookie.indexOf(";",c_start)  
         if(c_end==-1) c_end=document.cookie.length  
         return unescape(document.cookie.substring(c_start,c_end));  
       }  
    }  
} 


function CreateCookie(name, value, days) {
    if (days) {
        var date = new Date;
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1E3);
        var expires = "; expires=" + date.toGMTString()
    } else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/"

}   
function getCookie(c_name) {
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1) {
        c_start = c_value.indexOf(c_name + "=");
    }
    if (c_start == -1) {
        c_value = null;
    }
    else {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1) {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start, c_end));
    }
    return c_value;
}


        
