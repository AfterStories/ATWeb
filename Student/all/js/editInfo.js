var UpLoadURL = 'http://211.159.152.210:8188'
var FromValue;

var Sessionid = getCookie("JSESSIONID");
layui.use(['form', 'layer', 'laydate'], function(){



  var form = layui.form()
  ,layer = layui.layer
  ,laydate = layui.laydate;
  


$(document).ready(function(){

$.ajax({
        type:'GET',
        data:{},       
        url: UpLoadURL+'/AreTalkServer/Api/AreTalk/getCountryInfo.action',
        success:function(data) {
              for (var i = 0;i<data.data.countryInfo.length; i++) {
                  var countryInfo = '<option value="'+data.data.countryInfo[i].countryId+'">'+data.data.countryInfo[i].countryNameSelf+'</option>';
                  $('#WTL').append(countryInfo);
                  $('#ML').append(countryInfo);
                  $('#CJ').append(countryInfo);
                  
                   form.render();

                }
            },
        error: function () {
      }                        
}); //AJAX 国籍



$.ajax({
        type:'GET',             
        data:{}, 
        url: UpLoadURL+'/AreTalkServer/Web/Api/getMyInfo.action;jsessionid='+Sessionid,
        success:function(data) {
          /*头像*/
          $('#userHeadimg').attr('src',UpLoadURL+data.data.userInfo.avatar);
       },
        error:function(data,a,b,c) {
          /*alert("登录超时请重新登陆")*/
            }
   });//AJAX 头像


});//ready





  //监听提交
form.on('submit(editInfo)', function(data){
  console.log(data.field); 
   FromValue = data.field;
  save();
  return false;
  });
  

  
});//ues







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





function save() {

   $.ajax({
       type: "GET",
       url: 'http://211.159.152.210:8188/AreTalkServer/Web/Api/updateUserInfo.action;jsessionid='+Sessionid,
       data: FromValue,
       success: function (data) {  
                     
             layer.msg('保存成功'); 
         
           },
       error: function (a,b,c) {
           /*alert("登陆超时，请重新登陆");*/
            }
       });
          
}


$(".tips").click(function(e) {  
    $(this).show();  
        e.stopPropagation();  
});  
$(document).click(function(e) {  
  
    $(".tips").hide();  
      e.stopPropagation();  
});


