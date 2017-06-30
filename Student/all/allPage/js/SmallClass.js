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


function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
function buylesson(lessonid){

      layer.open({
        type: 2,
        title: "课程目录",
        shadeClose: true,
        resize:false,
        shade: false,
        maxmin: false, 
        scrollbar: false,
        area: ['770px', '525px'],
        content: 'catalog.html?lessonId='+lessonid
      });
    
}




var LangID =  GetQueryString("LangId")
$(document).ready(function(){
  if (!Sessionid) {
    alert("您尚未登录，请返回登录")
    window.location.href = "../../../OfficialWebsite/Login.html"
  }

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



 $.ajax({
        
        type: "POST",
        url: 'http://211.159.152.210:8188/AreTalkServer/Web/Api/getLessonsByLang.action;jsessionid='+Sessionid,
        data: {langId:LangID,pageNumber:1,displayCount:100,type:1},
        success: function (data) {

                var headurl;var showTime;
            
                for (var i = 0; i<data.data.lessonList.length; i++) {
                     var theclassNo = data.data.lessonList[i].currentLesson;
                     var starTime = data.data.lessonList[i].time;                    
                     var showTime = starTime.slice(0,10)+" "+starTime.slice(11,16);                  
                     var thelessonId = data.data.lessonList[i].lessonId;
                     var lessoning = data.data.lessonList[i].realStartTime;
                
    
                if(data.data.lessonList[i].headurl!==null){ 
                                
                    headurl = 'http://211.159.152.210:8188'+data.data.lessonList[i].headurl;                   
                  }else{
            
                    headurl = "images/c.jpg" 
                  };
    
    
                    var Small_Card ='<div class="col-md-3 resent-grid recommended-grid slider-first"><div class="resent-grid-img recommended-grid-img"><a href="#"><img src='+headurl+' alt="" /></a><div class="time small-time slider-time"></div><div class="clck small-clck"></div></div><div class="resent-grid-info recommended-grid-info"><h5><a href="single.html" class="title">'+data.data.lessonList[i].title+'</a><div class="BuyBtn" onclick="buylesson('+thelessonId+')">购买本课</div></h5><div class="slid-bottom-grids"><div class="slid-bottom-grid"><p class="author author-info"><a href="#" class="author">'+data.data.lessonList[i].name+'</a></p></div><div class="slid-bottom-grid slid-bottom-right"><p class="views views-info"><img class="clockIcon" src="images/clock.png" alt="">'+showTime+'</p></div><div class="clearfix"> </div></div></div></div>'
                
                    $("#SmallClass").append(Small_Card);                      
                }


     
        },
        error: function () {

                 }
        });


})
		
