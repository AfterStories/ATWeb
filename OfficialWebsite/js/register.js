var protocol;
var sexinput ;
var username;
var PhoneNumber;
var fromValue;
var PhoneArea;
var wait=60;  



layui.use(['layer', 'form','laydate'], function(){

    var layer = layui.layer;
    var form = layui.form();
    var laydate = layui.laydate;
    var start = {istoday: false};



 document.getElementById('LAY_demorange_s').onclick = function(){
    start.elem = this;
    laydate(start);
  }

  form.on('checkbox(protocol)', function(data){ 
  protocol = data.elem.checked;
  });//勾选条款

form.on('radio(sexinput)', function(data){
  sexinput = data.value
  console.log(sexinput); //被点击性别的radio的value值
});  

form.on('submit(getCode)', function(data){


  PhoneArea = data.field.countryId;
  GetCode();
});  

  form.on('submit(register)', function(data){
  fromValue = data.field;
   //当前容器的全部表单字段，名值对形式：{name: value}    

  register();
});





form.verify({

  agree: function(value, item){ //value：表单的值、item：表单的DOM对象

    if(!protocol){
      return ' 请您阅读后确认同意并勾选《服务条款》';
    }
  },
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
      










}); //layui.use结束





$(document).ready(function(){ 

/*引入公共模块*/

$("#header").load("lib/header/header.html",function(){

 });


//获取电话区号
$.ajax({                    
        type:'GET',
        data:{},       
        url: 'http://211.159.152.210:8188/AreTalkServer/Verify/getCountryAreacode.action',
        success:function(data) {
          
              for (var i = 0;i<data.data.areacode.length; i++) {
               var areacode = '<option value="'+data.data.areacode[i].countryId+'">+'+data.data.areacode[i].areaCode+'</option>';
               $('#PhoneNmuAre').append(areacode);                              
                  var form = layui.form();
                  form.render();
                }
            },
        error: function () {                  

      }                        
}); 

//获取国家
  $.ajax({
        type:'GET',
        data:{},       
        url: 'http://211.159.152.210:8188/AreTalkServer/Api/AreTalk/getCountryInfo.action',
        success:function(data) {
              for (var i = 0;i<data.data.countryInfo.length; i++) {
               var countryInfo = '<option value="'+data.data.countryInfo[i].countryId+'">'+data.data.countryInfo[i].countryNameSelf+'</option>';
               $('#motherlandId').append(countryInfo);                              
                  var form = layui.form();
                  form.render();
                }
            },
        error: function () {
      }                        
}); 










})//ready结束





function register(){
var IDcode = $("#IDcode").val();

  if (!sexinput) {
      alert("没有选择性别");
      return
  }


fromValue.password = hex_md5(fromValue.password);
fromValue.userName = fromValue.userName.toLowerCase();

  if (!IDcode) {
      alert("没有选择性别");
      return
  }  

    $.ajax({                    
        type:'POST',
        data:fromValue,       
        url: 'http://211.159.152.210:8188/AreTalkServer/Web/Login/register.action?userType=1',
        success:function(data) {
            if(data.data.status=="success"){          
              alert("注册成功");
              window.location.href='Login.html';
              
            }else{
              layer.msg('请重试',{time:1500});
            }

            },
        error: function () {                  
            
      
      }                        
        }); 
}






var checkInfoValid;
function GetCode(){

  username = $("#username").val();
  PhoneNumber = $("#PhoneNumber").val();
  var PhoneLocaltion = $('#PhoneNmuAre option:selected').val();//Select选中的值
  console.log(username);console.log(PhoneNumber);

  if (username&&PhoneNumber){


      $.ajax({
          async:false,
              type:'POST',
              data:{userName:username,phoneNo:PhoneNumber,type:1},       
              url: 'http://211.159.152.210:8188/AreTalkServer/Web/Login/checkInfoValid.action',
              success:function(data) {
                  
                  if(data.status="success"){
                    checkInfoValid = true;
                      
                      $.ajax({
                          async:false,                  
                          type:'POST',
                          data:{countryId:PhoneLocaltion,phoneNo:PhoneNumber,type:1},       
                          url: 'http://211.159.152.210:8188/AreTalkServer/Verify/sendPhoneNoVerifyCode.action',
                          success:function(data) {
                                if (data.status="success") {
                                    time();
                                   layer.msg('正在发送验证码，请查收手机短信',{time:1500});
                                }
                              
                              },
                          error: function () {                  
            
                            }                        
                      }); 

                  }else if(data.status="failed"){

                        if (data.item="userName") {
                            layer.msg('用户名已被注册',{time:1500});
                        }else if(data.item="phoneNO"){
                            layer.msg('手机号已注册',{time:1500});
                        }
                  }
                    

                  },
              error: function () {
              
              }                        
          }); 

  }else{
  
    layer.msg('用户名或手机号不得为空，请重试',{time:1500});
  }






}

function time(){
          if (wait == 0) { 
            $("#sendCode").removeAttr("disabled");           
            $("#sendCode").html("获取验证码");
            $("#sendCode").css("background-color", "#39b0ef"); 
            wait = 60;  
        } else {  
            $("#sendCode").attr("disabled", "true");  
            $("#sendCode").css("background-color", "#9da2a7"); 
            $("#sendCode").html("重新获取"+wait);  
            wait--;  
            setTimeout(function() {  
                time()  
            },  
            1000)  
        }  

}