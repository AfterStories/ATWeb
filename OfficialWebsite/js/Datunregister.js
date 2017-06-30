var UpLoadURL = 'http://211.159.152.210:8188';

var Sessionid = getCookie("JSESSIONID");




layui.use(['layer', 'form','laydate'], function(){
  var layer = layui.layer;
  var form = layui.form();



form.on('submit(nextFrom)', function(data){

fromValue = data.field;

console.log(fromValue);

next();

});


}); 





$(document).ready(function(){ 
  $("#header").load("lib/header/header.html",function(){
  
});

  $("footer").load("lib/footer/footer.html",function(){
    $('.changeLangSet').dropkick({

        change: function (value) {

          $("body").cloudLang({lang: value, file: "lib/js/lang/lang-resource.xml"});
          $("#LanguagePic img").attr("src","images/"+value+".png");
        }

      });

  })





})//ready结束


function next(){

  var MyTContent = fromValue.MyTContent;
  var videoId = $("#vedio-upload").attr('value');
  var MP3Id = $("#MP3-upload").attr('value');
  var IDuploadId = $("#ID-upload").attr('value');
  var schoolId = $("#school-upload").attr('value');
  var teacherZige = $("#teacher-upload").attr('value');
  var otheroId = $("#other-upload").attr('value');
  var Teachlevel = fromValue.TeachLvChoose;
  if (videoId&&MP3Id){

        if (IDuploadId&&schoolId&&teacherZige&&otheroId){

            if (Teachlevel) {

                  $.ajax({
                      type:'POST',
                      data:{level:Teachlevel,
                            movieId:videoId,
                            audioId:MP3Id,
                            idCardImageAid:IDuploadId,
                            idCardImageBid:null,
                            diplomaImageId:schoolId,
                            teacherdiplomaImageId:teacherZige,
                            imageAid:otheroId,
                            imageBid:null
                      },       
                      url: UpLoadURL+'/AreTalkServer/Web/Api/updateTeacherCheckInfo.action;jsessionid='+Sessionid,
                      success:function(data) {
                    
                            console.log(" next() 成功")
                            Teacherintro();             
              
              
                          },
                      error: function () {                  
                          console.log(" next() error")
                    
                    }                        
                      });                   
            }else{
               alert("教学经验等级未填写")
               return;               
            }

         }else{
          alert("还有相关证明图没有上传");
          return;            
         }

  }else{
     alert("视频或音频没有上传")
     return;    
  }


 

}


function Teacherintro(){


     $.ajax({                    
        type:'POST',
        data:{comment:fromValue.MyTContent},       
        url: UpLoadURL+'/AreTalkServer/Web/Api/editTeacherComment.action;jsessionid='+Sessionid,
        success:function(data) {      
                console.log("Teacherintro() 成功")    
                window.location.href = "TeacherProvision.html";
            },
        error: function () { 
               console.log("Teacherintro() error")
      }                        
        });  
}

function CreateCookie(name, value, days) {
    if (days) {
        var date = new Date;
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1E3);
        var expires = "; expires=" + date.toGMTString()
    } else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/"

}


function GetQueryString(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
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