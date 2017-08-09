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




$(document).ready(function(){ 

var Language = getCookie("Language");
if (Language) {
  console.log(Language)
}else{
  Language = "zh"
}

layui.use(['layer', 'form'], function(){
  var layer = layui.layer;
  var form = layui.form();

var protocol;
form.on('checkbox(protocol)', function(data){
protocol = data.elem.checked
  console.log(protocol); //是否被选中，true或者false
});


form.verify({
  username: function(value, item){ //value：表单的值、item：表单的DOM对象
    if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
      return '用户名不能有特殊字符';
    }
    if(/(^\_)|(\__)|(\_+$)/.test(value)){
      return '用户名首尾不能出现下划线\'_\'';
    }

  }
  
  //我们既支持上述函数式的方式，也支持下述数组的形式
  //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
  ,pass: [
    /^[\S]{1,50}$/
    ,'不能出现空格'
  ] 
});      
        
      


    form.on('submit(register)', function(data){
    //console.log(data.elem) 被执行事件的元素DOM对象，一般为button对象
    //console.log(data.form) 被执行提交的form对象，一般在存在form标签时才会返回
    console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}


//下面调用登陆

    var LoginURL = "http://211.159.152.210:8188/AreTalkServer/Web/Login/";

    var TheuserName,Thepassword;


    
        var userName = $("#username").val();
        TheuserName = userName;
        var password = hex_md5($("#Password").val());
        Thepassword = password;
    
    if (!userName || !password) {
            layer.msg('请输入您的用户名与密码。');
            return false;
        }else{

                $.ajax({
                    type: "GET",
                    url: LoginURL+"login.action?userName="+userName+"&password="+password+"&userType=1",
                    data: {},
                    success: function (data) {                        
                    CreateCookie(TheuserName, Thepassword, 30);
                    CreateCookie("IfLogin",TheuserName, 30);
                    CreateCookie("JSESSIONID", data.data.JSESSIONID, 30);
    
                    if(data.data.status=="success"){
                        

                        layer.msg("登陆成功",{time:1500});
                        location.replace("../Student/all/allPage/index.html?LoginedName="+TheuserName);
                   
                        var isLogin = true; 
                    }else{
                           layer.msg("用户名或密码错误，请重试");

                         }                        
                      
                        },
                    error: function (a,b,c) {
                           layer.msg("网络超时，请重试");
                         }
                    });

            } 




        
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




})
 






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


        
