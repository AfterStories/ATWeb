  layui.use(['layer','element'],function(){
  var element = layui.element(); //Tab的切换功能，切换事件监听等，需要依赖element模块
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



function download(){
    window.location="../../../OfficialWebsite/Download.html";
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

function Intolesson(Id,No){
  window.location="single.html?thelessonId="+Id+"&&ClassNo="+No;
}


function GetQueryString_parent(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.parent.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}








var Sessionid = getCookie("JSESSIONID");
var LoginedName = GetQueryString_parent("LoginedName");
var stupsw = getCookie(LoginedName);;


  if (!Sessionid) {
    alert("您尚未登录，请返回登录")
    window.location.href = "../../../OfficialWebsite/Login.html"
  }

$(document).ready(function(){




$("h3").bind("click",function(){ 

    $(this).addClass('tabActive').siblings().removeClass('tabActive');
})

$("h3").bind("click",function(){ 
     var cur = $(this).index();
    $('.top-grids').eq(cur).show().siblings('.top-grids').hide();
})


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
        url: 'http://211.159.152.210:8188/AreTalkServer/Web/Api/getMyLessons.action;jsessionid='+Sessionid+"?type=1",
        data: {},
        success: function (data) {
          if(data.data.count=="0"){
              alert("您没有购买小班课课程")
          }else{

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

                var Small_Card;
                  if (lessoning==null) {
                    Small_Card ='<div class="col-md-3 resent-grid recommended-grid slider-first"><div class="resent-grid-img recommended-grid-img"><a href="#"><img src='+headurl+' alt="" /></a><div class="time small-time slider-time"></div><div class="clck small-clck"></div></div><div class="resent-grid-info recommended-grid-info"><h5><a href="#" class="title">'+data.data.lessonList[i].title+'</a><div class="BuyBtn-bc" >进入教室</div></h5><div class="slid-bottom-grids"><div class="slid-bottom-grid"><p class="author author-info"><a href="#" class="author">'+data.data.lessonList[i].name+'</a></p></div><div class="slid-bottom-grid slid-bottom-right"><p class="views views-info"><img class="clockIcon" src="images/clock.png" alt="">'+showTime+'</p></div><div class="clearfix"> </div></div></div></div>'
                

                  }
                  else{
                    Small_Card ='<div class="col-md-3 resent-grid recommended-grid slider-first"><div class="resent-grid-img recommended-grid-img"><a href="#"><img src='+headurl+' alt="" /></a><div class="time small-time slider-time"></div><div class="clck small-clck"></div></div><div class="resent-grid-info recommended-grid-info"><h5><a href="#" class="title">'+data.data.lessonList[i].title+'</a><div class="BuyBtn" onclick="Intolesson('+thelessonId+','+theclassNo+')">进入教室</div></h5><div class="slid-bottom-grids"><div class="slid-bottom-grid"><p class="author author-info"><a href="#" class="author">'+data.data.lessonList[i].name+'</a></p></div><div class="slid-bottom-grid slid-bottom-right"><p class="views views-info"><img class="clockIcon" src="images/clock.png" alt="">'+showTime+'</p></div><div class="clearfix"> </div></div></div></div>'
                }
                    
                    $("#SmallClass").append(Small_Card);

                }

}


            
 
          
        },
        error: function () {
              /*    alert("登陆超时，请重新登陆");
                  parent.location.href="../html/index.html";*/
                 }
        });
		

















    $.ajax({
        
        type: "POST",
        url: 'http://211.159.152.210:8188/AreTalkServer/Web/Api/getMyLessons.action;jsessionid='+Sessionid+"?type=2",
        data: {},
        success: function (data) {
if(data.data.count=="0"){
    alert("您没有购买一对一课程")
}else{
            var headurl;var showTime;
           
            for (var i = 0; i<data.data.lessonList.length; i++) {
                 var theclassNo = data.data.lessonList[i].currentLesson;
                 var starTime = data.data.lessonList[i].time;                    
                 var showTime = starTime.slice(0,10)+" "+starTime.slice(11,19);                  
                 var thelessonId = data.data.lessonList[i].lessonId;
                 var lessoning = data.data.lessonList[i].realEndTime;
            

            if(data.data.lessonList[i].headurl!==null){ 
                            
                headurl = 'http://211.159.152.210:8188'+data.data.lessonList[i].headurl;                   
              }else{
           
                headurl = "images/c.jpg" 
              };



                var OnetoOne_Card;
                  if (lessoning==null) {
                    OnetoOne_Card ='<div class="col-md-3 resent-grid recommended-grid slider-first"><div class="resent-grid-img recommended-grid-img"><a href="#"><img src='+headurl+' alt="" /></a><div class="time small-time slider-time"></div><div class="clck small-clck"></div></div><div class="resent-grid-info recommended-grid-info"><h5><a href="#" class="title">'+data.data.lessonList[i].title+'</a><div class="BuyBtn-bc" >进入教室</div></h5><div class="slid-bottom-grids"><div class="slid-bottom-grid"><p class="author author-info"><a href="#" class="author">'+data.data.lessonList[i].name+'</a></p></div><div class="slid-bottom-grid slid-bottom-right"><p class="views views-info"><img class="clockIcon" src="images/clock.png" alt="">'+showTime+'</p></div><div class="clearfix"> </div></div></div></div>'
                

                  }
                  else{
                    OnetoOne_Card ='<div class="col-md-3 resent-grid recommended-grid slider-first"><div class="resent-grid-img recommended-grid-img"><a href="#"><img src='+headurl+' alt="" /></a><div class="time small-time slider-time"></div><div class="clck small-clck"></div></div><div class="resent-grid-info recommended-grid-info"><h5><a href="#" class="title">'+data.data.lessonList[i].title+'</a><div class="BuyBtn" onclick="Intolesson('+thelessonId+','+theclassNo+')">进入教室</div></h5><div class="slid-bottom-grids"><div class="slid-bottom-grid"><p class="author author-info"><a href="#" class="author">'+data.data.lessonList[i].name+'</a></p></div><div class="slid-bottom-grid slid-bottom-right"><p class="views views-info"><img class="clockIcon" src="images/clock.png" alt="">'+showTime+'</p></div><div class="clearfix"> </div></div></div></div>'
                }
                    
                    $("#OneToOneLessons").append(OnetoOne_Card);




            }

            }
 
          
        },
        error: function () {
              /*    alert("登陆超时，请重新登陆");
                  parent.location.href="../html/index.html";*/
                 }
        });
	

})