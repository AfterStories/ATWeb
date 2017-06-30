var UpLoadURL = 'http://211.159.152.210:8188';

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


var Sessionid = getCookie("JSESSIONID");

function getFileName(name){
     var json = name.split(".")
     return json[1];
}

/*  alert($("input[name='rad']:checked").val());*/



$(function () {
    /*'use strict';*/

$('.fileupload').each(function (){
    // Initialize the jQuery File Upload widget:
    $(this).fileupload({
        //Uncomment the following to send cross-domain cookies:
        //xhrFields: {withCredentials: true},
        url: UpLoadURL+'/AreTalkServer/Servlet/UploadHandleServlet',
        disableImageResize: false, 
        //预览图片尺寸
        previewMinWidth:200,
        previewMinHeight:100,
        previewMaxWidth:400,
        previewMaxHeight:150,        
        singleFileUploads: false,//一次只能上传一个文件
        change: function(e, data) {


                if(data.files.length > 1){
                    alert("Max 1 file are allowed selected")
                    return false;
                }
            }
    })
})

/*
每个选项的上传配置*/

//视频上传
$('#vedio-upload').fileupload(
        'option',
        'redirect',
        window.location.href.replace(/\/[^\/]*$/,'/cors/result.html?%s')
        ).bind('fileuploaddone', function (e, data) {

          var exerciseID = data.result.files[0].id;                             
          var exerciseUrl = UpLoadURL+data.result.files[0].url;
          var filetype = getFileName(data.result.files[0].url);
         
          $("#vedio-upload").attr('value',exerciseID);
          $("#videoBox").empty();
          if (filetype!=='mp3'&&filetype!=='jpg'&&filetype!=='png'){            
            var exerciseCard = '<video src="'+exerciseUrl+'" controls=""></video>'
            $("#videoBox").append(exerciseCard);
            alert("上传成功")            
          }
        });  
     
//音频上传
$('#MP3-upload').fileupload(
        'option',
        'redirect',
        window.location.href.replace(/\/[^\/]*$/,'/cors/result.html?%s')
        ).bind('fileuploaddone', function (e, data) {

          var exerciseID = data.result.files[0].id;                             
          var exerciseUrl = UpLoadURL+data.result.files[0].url;
          var filetype = getFileName(data.result.files[0].url);
         
          $("#MP3-upload").attr('value',exerciseID);
          $("#MP3Box").empty();
          if (filetype!=='mp4'&&filetype!=='jpg'&&filetype!=='png'){            
            var exerciseCard = '<audio controls><source src='+exerciseUrl+' type="audio/mpeg"></audio>'
            $("#MP3Box").append(exerciseCard); 
            $('#MP3-upload').attr("value",exerciseID)
            alert("上传成功");        
          } 
});  
//身份证
$('#ID-upload').fileupload(
        'option',
        'redirect',
        window.location.href.replace(/\/[^\/]*$/,'/cors/result.html?%s')
        ).bind('fileuploaddone', function (e, data) {

          var exerciseID = data.result.files[0].id;                             
          var exerciseUrl = UpLoadURL+data.result.files[0].url;
          var filetype = getFileName(data.result.files[0].url);
          $('#ID-upload').attr("value",exerciseID);
          $("#CerUploadTitlePic").attr('src',exerciseUrl);
          $("#ID-upload .CerUpBtn").hide();
          alert("上传成功");
 
});  
//毕业证书
$('#school-upload').fileupload(
        'option',
        'redirect',
        window.location.href.replace(/\/[^\/]*$/,'/cors/result.html?%s')
        ).bind('fileuploaddone', function (e, data) {

          var exerciseID = data.result.files[0].id;                             
          var exerciseUrl = UpLoadURL+data.result.files[0].url;
          var filetype = getFileName(data.result.files[0].url);
          $('#school-upload').attr("value",exerciseID);
          $("#SchUploadTitlePic").attr('src',exerciseUrl);
          $("#school-upload .CerUpBtn").hide();
          alert("上传成功");
 
});    
//教师资格证
$('#teacher-upload').fileupload(
        'option',
        'redirect',
        window.location.href.replace(/\/[^\/]*$/,'/cors/result.html?%s')
        ).bind('fileuploaddone', function (e, data) {

          var exerciseID = data.result.files[0].id;                             
          var exerciseUrl = UpLoadURL+data.result.files[0].url;
          var filetype = getFileName(data.result.files[0].url);
          $('#teacher-upload').attr("value",exerciseID);
          $("#teacherUploadTitlePic").attr('src',exerciseUrl);
          $("#teacher-upload .CerUpBtn").hide();
          alert("上传成功");
 
});
//其他
$('#other-upload').fileupload(
        'option',
        'redirect',
        window.location.href.replace(/\/[^\/]*$/,'/cors/result.html?%s')
        ).bind('fileuploaddone', function (e, data) {

          var exerciseID = data.result.files[0].id;                             
          var exerciseUrl = UpLoadURL+data.result.files[0].url;
          var filetype = getFileName(data.result.files[0].url);
          $('#other-upload').attr("value",exerciseID);
          $("#otherUploadTitlePic").attr('src',exerciseUrl);
          $("#other-upload .CerUpBtn").hide();
          alert("上传成功");
 
});          


        // Load existing files:
        $('.fileupload').addClass('fileupload-processing');
        $.ajax({
            // Uncomment the following to send cross-domain cookies:
            //xhrFields: {withCredentials: true},
            url: $('.fileupload').fileupload('option', 'url'),
            dataType: 'json',
            context: $('.fileupload')[0]
        }).always(function () {
            $(this).removeClass('fileupload-processing');
        }).done(function (result) {
            $(this).fileupload('option', 'done')
              .call(this, $.Event('done'), {result: result});          
        });
  

});


