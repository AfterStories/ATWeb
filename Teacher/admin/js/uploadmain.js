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

$(function () {

    $(':radio').click(function () { 
      
        this.blur();this.focus();
        var selectedvalue = $(this).val();
        if (selectedvalue=='choose') {
            $('.Anwser-choose').show();
            $('#ThisAnswer').show();
        }else if (selectedvalue=='fillIn') {
            $('.Anwser-choose').hide();
            $('#ThisAnswer').show();
        }else if (selectedvalue=='Write') {
            $('.Anwser-choose').hide();
            $('#ThisAnswer').hide();            
        }

    }); 

});


    $('#exercise-Type .btn').click(function(){
        //内容切换
        var cur = $(this).index();
        $('.Type-tab-main').eq(cur).show().siblings('.Type-tab-main').hide();
        
    })



    function getFileName(name){
     var json = name.split(".")
     return json[1];
    }


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
$('#UploadAnswerA').fileupload(
        'option',
        'redirect',
        window.location.href.replace(/\/[^\/]*$/,'/cors/result.html?%s')
        ).bind('fileuploaddone', function (e, data) {

          var exerciseID = data.result.files[0].id;                             
          var exerciseUrl = UpLoadURL+data.result.files[0].url;
          var filetype = getFileName(data.result.files[0].url);
          $(".AnswerA").remove();$("#UploadAnswerA").remove();
          $("#ABOX").attr('value',exerciseID);
          if (filetype=='mp3'){            
            var MP3exerciseCard = '<div id="AnswerA-MP3" class="Answer-MP3-BOX"><div class="AnswerMP3pre"><audio controls><source src='+exerciseUrl+' type="audio/mpeg"></audio></div></div>'
            $("#ABOX").append(MP3exerciseCard);            
          }else if (filetype=='jpg'||filetype=='png'||filetype=='gif'){           
            var exerciseCard = '<div class="ImgBox"><img src='+exerciseUrl+'></div>';
            $("#ABOX").append(exerciseCard);            
          }
        });  
                

$('#UploadAnswerB').fileupload(
        'option',
        'redirect',
        window.location.href.replace(/\/[^\/]*$/,'/cors/result.html?%s')
        ).bind('fileuploaddone', function (e, data) {

          var exerciseID = data.result.files[0].id;                             
          var exerciseUrl = UpLoadURL+data.result.files[0].url;
          var filetype = getFileName(data.result.files[0].url);
          $(".AnswerB").remove();$("#UploadAnswerB").remove();
          $("#BBOX").attr('value',exerciseID);
          if (filetype=='mp3'){            
            var MP3exerciseCard = '<div id="AnswerA-MP3" class="Answer-MP3-BOX"><div class="AnswerMP3pre"><audio controls><source src='+exerciseUrl+' type="audio/mpeg"></audio></div></div>'
            $("#BBOX").append(MP3exerciseCard);
          }else if (filetype=='jpg'||filetype=='png'||filetype=='gif'){            
            var exerciseCard = '<div class="ImgBox"><img src='+exerciseUrl+'></div>';            
            $("#BBOX").append(exerciseCard);
          }
        });  

$('#UploadAnswerC').fileupload(
        'option',
        'redirect',
        window.location.href.replace(/\/[^\/]*$/,'/cors/result.html?%s')
        ).bind('fileuploaddone', function (e, data) {

          var exerciseID = data.result.files[0].id;                             
          var exerciseUrl = UpLoadURL+data.result.files[0].url;
          var filetype = getFileName(data.result.files[0].url);
          $(".AnswerC").remove();$("#UploadAnswerC").remove();
          $("#CBOX").attr('value',exerciseID);
          if (filetype=='mp3'){            
            var MP3exerciseCard = '<div id="AnswerA-MP3" class="Answer-MP3-BOX"><div class="AnswerMP3pre"><audio controls><source src='+exerciseUrl+' type="audio/mpeg"></audio></div></div>'
            $("#CBOX").append(MP3exerciseCard);            
          }else if (filetype=='jpg'||filetype=='png'||filetype=='gif'){           
            var exerciseCard = '<div class="ImgBox"><img src='+exerciseUrl+'></div>';
            $("#CBOX").append(exerciseCard);            
          }
        });  

$('#UploadAnswerD').fileupload(
        'option',
        'redirect',
        window.location.href.replace(/\/[^\/]*$/,'/cors/result.html?%s')
        ).bind('fileuploaddone', function (e, data) {

          var exerciseID = data.result.files[0].id;                             
          var exerciseUrl = UpLoadURL+data.result.files[0].url;
          var filetype = getFileName(data.result.files[0].url);
          $(".AnswerD").remove();$("#UploadAnswerD").remove();
          $("#DBOX").attr('value',exerciseID);
          if (filetype=='mp3'){            
            var MP3exerciseCard = '<div id="AnswerA-MP3" class="Answer-MP3-BOX"><div class="AnswerMP3pre"><audio controls ><source src='+exerciseUrl+' type="audio/mpeg"></audio></div></div>'
            $("#DBOX").append(MP3exerciseCard);            
          }else if (filetype=='jpg'||filetype=='png'||filetype=='gif'){            
            var exerciseCard = '<div class="ImgBox"><img src='+exerciseUrl+'></div>';
            $("#DBOX").append(exerciseCard); 
           
          }
        });  





/*题干文件上传*/
$('#exerciseSRC-upload').fileupload(
        'option',
        'redirect',
        window.location.href.replace(/\/[^\/]*$/,'/cors/result.html?%s')
        ).bind('fileuploaddone', function (e, data){
          var exerciseID = data.result.files[0].id;                             
          var exerciseUrl = UpLoadURL+data.result.files[0].url;
          var filetype = getFileName(data.result.files[0].url);         
 
          if (filetype=='mp3'){
            var MP3exerciseCard = '<div id="Mp3preID" value='+exerciseID+' SrcTpye='+filetype+'><audio controls ><source src='+exerciseUrl+' type="audio/mpeg"></audio></div>';
            $("#exercise-src").append(MP3exerciseCard);
          }else if (filetype=='jpg'||filetype=='png'||filetype=='gif'){
            var exerciseCard = '<div id="ImgpreID" value='+exerciseID+' SrcTpye='+filetype+'><img  src='+exerciseUrl+'></div>';
            $("#exercise-src").append(exerciseCard);           
          }
            
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


function AddExercise(){
/*题干预览*/
var exerciseTitle = $("#exercise-title").val();//标题
var realAnwser = $(".realAnswer").val();//习题答案
var anwserType = $("input[type='radio']:checked").val(); //答案类型    1 选择  2填空
var exerciseTypeId = $("#ProblemType").find("option:selected").val();//习题类型Id
var lvProblem = $("#lvProblem").find("option:selected").val();//难度等级
var exerciseDescribe = $("#explain-textarea").val();//习题描述  习题说明  客户端不显示
//选项答案
var AnswerAtext = $(".AnswerA").val();var AnswerBtext = $(".AnswerB").val();
var AnswerCtext = $(".AnswerC").val();var AnswerDtext = $(".AnswerD").val();
//图片选项答案
var answerAId = $("#ABOX").attr("value");var answerBId = $("#BBOX").attr("value");
var answerCId = $("#CBOX").attr("value");var answerDId = $("#DBOX").attr("value");

var imgId =null ;var mp3Id = null;
var anwserA;var anwserB;var anwserC;var anwserD;
var questionDescribe = $("#Image-exercise-textarea").val();//题干
var questionDescribeId = null;  //题干ID   只有字或者图
  
var Mp3MainSrcId = $("#Mp3preID").attr("value");
var Mp3SrcTpye = $("#Mp3preID").attr("SrcTpye"); 
var ImgMainSrcId = $("#ImgpreID").attr("value");
var ImgSrcTpye = $("#ImgpreID").attr("SrcTpye"); 

if (Mp3MainSrcId){
    mp3Id = Mp3MainSrcId;
};

if(ImgMainSrcId){
    questionDescribeId = ImgMainSrcId;
    questionDescribe = null
};

if (answerAId){
        anwserA = null;
      }else{
        anwserAId = null;
      };

if (answerBId){
        anwserB = null;
      }else{
        anwserBId = null;
      };

if (answerCId){
        anwserC = null;
      }else{
        anwserCId = null;
      };

if (answerDId){
        anwserD = null;
      }else{
        anwserDId = null;
      };


console.log("标题"+exerciseTitle);
console.log("答案"+realAnwser);
console.log("答案类型"+anwserType);
console.log("难度等级"+lvProblem);
console.log("习题类型Id"+exerciseTypeId);
console.log("A"+AnswerAtext);
console.log("B"+AnswerBtext);
console.log("C"+AnswerCtext);
console.log("D"+AnswerDtext);
console.log("A-ID"+answerAId);
console.log("B-ID"+answerBId);
console.log("C-ID"+answerCId);
console.log("D-ID"+answerDId);
console.log("imgId"+imgId);
console.log("mp3Id"+mp3Id);
console.log("题干"+questionDescribe);
console.log("题干ID"+questionDescribeId);




/*          $.ajax({
                type:'POST',
                data:{
                      level:lvProblem,
                      title:exerciseTitle,
                      mp3Id:,
                      imgId:,//练字题
                      anwserA:,
                      anwserAId:,
                      anwserB:,
                      anwserBId:,
                      anwserC:,
                      anwserCId:,
                      anwserD:,
                      anwserDId:,
                      exerciseTypeId:,
                      anwserType:anwserType,
                      exerciseDescribe:,
                      questionDescribe:,//题干
                      questionDescribeId:,
                      realAnwser:realAnwser,
                  },       
              url: UpLoadURL+'/Web/Api/addQuestion.action;jsessionid='+Sessionid,
              success:function(data) {
                alert("添加成功")
                  },
              error:function() {
                alert("网络有点小问题~请重试")
                  }
              }); */

}
