function download(){
    window.location="../../../OfficialWebsite/Download.html";
}


layui.use('layer', function(){
  var layer = layui.layer;     

$("#userHeadImg").bind("click",function(){  

      layer.tips('<li style="cursor:pointer" class="tipsBtn" id="editInfoBtn" onclick="editInfoBtn()">编辑资料</li><li style="cursor:pointer" class="tipsBtn" id="logoutBtn" onclick="logout()">退出登录</li>', '#userHeadImg', {
      tips: 3,
      time: 4000
      });




 });

});

function editInfoBtn(){
        layer.open({
        type: 2,
        title: "编辑资料",
        shadeClose: true,
        resize:false,
        shade: false,
        maxmin: false, 
        scrollbar: false,
        area: ['1146px', '600px'],
        content: 'editInfo.html'
      });
}

function logout(){

    CreateCookie(TheuserName, "", -1);
    
    CreateCookie("JSESSIONID","",-1);

     location.href="../../../OfficialWebsite/Login.html";

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

function GetQueryString_parent(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.parent.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}



function setSize(){

$('#LiveFrame').css("width",$(".song").width());
$('#LiveFrame').css("height",$(".song").width()/1.78);
}



  
//人工拖扯窗口大小时，重设框架款宽度
$(window).resize(function () { 
setSize();
});




var Sessionid = getCookie("JSESSIONID");
var thelessonId = GetQueryString_parent("thelessonId");
var ClassNo = GetQueryString_parent("ClassNo");


$(document).ready(function(){

setSize();//页面加载时设框架款宽度

       $.ajax({
              dataType:'json',
              type:'GET',
              async:false,
              data:{},       
              url: 'http://211.159.152.210:8188/AreTalkServer/Web/Api/getMyInfo.action;jsessionid='+Sessionid,
              success:function(data) {
           
                  $('#TopuserHeadImg').attr('src','http://211.159.152.210:8188'+data.data.userInfo.avatar);
              },
              error:function(data,a,b,c) {
                /*alert("登录超时请重新登陆")*/
              }
              });
//获取相似课程
/*      
       $.ajax({
              dataType:'json',
              type:'GET',              
              data:{lessonId:thelessonId},       
              url: 'http://211.159.152.210:8188/Api/Lesson/getAlikeLesson.action;jsessionid='+Sessionid,
              success:function(data) {           
                  
              },
              error:function(data,a,b,c) {
                
              }
              });
*/


getLive()
	function getLive(){

      $.ajax({
        async:false,
        type: "POST",
        url: 'http://211.159.152.210:8188/AreTalkServer/Web/Api/getClassRoomInfo.action;jsessionid='+Sessionid,
        data: {lessonId :thelessonId,classNo :ClassNo},
        success: function (data) {
        	$(".song-info h3").text(data.data.lessonInfo.lessonDetail[(ClassNo-1)].title);
        	$("#teacherDec").text(data.data.lessonInfo.lessonDetail[(ClassNo-1)].lessonDescribe);
          $("#name").text(data.data.lessonInfo.userInfo.name);
          $("#LessonIMG img").attr("src",'http://211.159.152.210:8188/'+data.data.lessonInfo.lessonImg.coverImgUrl);
          var TeacherFace = data.data.lessonInfo.userImgFace.url;
          if (TeacherFace) {
            $("#HeadImg").attr("src",'http://211.159.152.210:8188/'+TeacherFace);
          
          }else{
            $("#HeadImg").attr("src","images/c.jpg");
          }

          for(i=0;i<data.data.lessonEvaluate.length;i++){
            var CommentFrom = data.data.lessonEvaluate[i].userInfo.user.name;
            var CommentFace = data.data.lessonEvaluate[i].userInfo.avatar;
            var CommentBody = data.data.lessonEvaluate[i].evaluate.evaluate;
            var CommentTime = (data.data.lessonEvaluate[i].evaluate.time).replace("T"," ");

/*              var ComList ='<div class="TheCommentBox"><h5>'+CommentFrom+'</h5><div class="media-left"><img src="http://211.159.152.210:8188'+CommentFace+'"></img></div><div class="media-body"><p>'+CommentBody+'</p><span>Time:<div>'+CommentTime+'</div></span></div></div></div>';*/
              var ComList = '<div class="TheCommentBox"><div class="media-left"><img src="http://211.159.152.210:8188'+CommentFace+'"></div><div class="media-body"><h5>'+CommentFrom+'</h5><div class="CommentBody">'+CommentBody+'</div><div class="TheCommentTime">'+CommentTime+'</div></div></div>'

              $("#commentList").append(ComList);
          }


          

       },
        error: function () {
        		alert("Network timeout, please try again later")
                 }
        });


}



})
