<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	<%@page import="java.util.List"%> 
<%@taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
  
    <meta charset="utf-8">
    <title>AreTalk FM</title>
    <meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <link rel="stylesheet" type="text/css" href="lib/bootstrap/css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="lib/bootstrap/css/bootstrap-responsive.css">
  
    <link rel="stylesheet" href="lib/font-awesome/css/font-awesome.css">
  <link rel="stylesheet" type="text/css" href="stylesheets/theme.css">
<style type="text/css">
#preview{width:100px;height:100px;border:1px solid #000;overflow:hidden;}
#imghead {filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=image);}
</style>
    <script src="lib/jquery-1.8.1.min.js" type="text/javascript"></script>
<script type="text/javascript">
    //下拉列表
     $(document)
			.ready(
					function() {
						//获取待审核文件数
						$.ajax({
		                       type : 'POST',
		                       url : "getFmAuditFileCount.action",			                     
		                       dataType : 'JSON',
		                       success : function(data) {
		                    	   document.getElementById('auditcount').innerHTML = data.auditcount+'条';	
		                    	   document.getElementById('userName').innerHTML = data.userName;
		                          },
		                       error : function() {				                 				                   
		                          }
	                             });
						
						
						 $.ajax({
		                       type : 'POST',
		                       url : "FmAudioKindAction.action",			                     
		                       dataType : 'JSON',
		                       success : function(data) {
		                    	   var txt_pendingFileIdname1 = $("#txt_pendingFileIdname1");	
		                    	   var str = '';
		                    	   for(var o in data.FilekindName) {
		                    			str = "<option value='"+data.FilekindName[o].id+"'>" + data.FilekindName[o].filekindName + "</option>"	
		                    		   $("#txt_pendingFileIdname1").append(str);	   
		                    	   }
		  
		                          },
		                       error : function() {				                 				                   
		                          }
	                             }); 
						//alert("hahahah");
    	                     $.ajax({
			                       type : 'POST',
			                       url : "http://211.159.152.210:8188/AreTalkServer/Api/AreTalk/getLanguage.action",
			                       dataType : 'JSON',
			                       success : function(data) {
			                    	   var txt_languageInfoname = $("#txt_languageInfoname");	
			                    	   var str = '';
			                    	   for(var o in data.data.languageInfo) {
			                    			str = "<option value='"+data.data.languageInfo[o].id+"'>" + data.data.languageInfo[o].name + "</option>"	
			                    		   $("#txt_languageInfoname").append(str);	   
			                    	   }			                    	  
			                          },			                       
		                             });    	                                             	                    	                     
                                })
    
    </script>
    <script>
                                  function readFile(obj){   
                                  var file = obj.files[0];      
                                   //判断类型是不是图片  
                                  if(!/image\/\w+/.test(file.type)){     
                                  alert("请确保文件为图像类型");   
                                  var obj = document.getElementById('picFile') ; 
                            	  obj.outerHTML=obj.outerHTML;                            	  
                                  return false;   
                                  }   
                                  var reader = new FileReader();   
                                  reader.readAsDataURL(file);   
                                  reader.onload = function(e){   
                                  alert(this.result); //就是base64  

                                  }   
                                    } 
  </script> 
  
  <script type="text/javascript">
                //图片上传预览    IE是用了滤镜。
        function previewImage(file)
        { 
          var file1 = file.files[0]; 
        	 if(!/image\/\w+/.test(file1.type)){  
                 alert("请确保文件为图像类型");                 
              var obj = document.getElementById('preview1') ; 
           	  obj.outerHTML=obj.outerHTML;                            	  
                 return false;   
                 }
        document.getElementById('filecancel1').innerHTML = '&nbsp;&nbsp;<button onclick="clearimage()" type="button">取消</button>';
          var MAXWIDTH  = 260; 
          var MAXHEIGHT = 180;
          var div = document.getElementById('preview');
          if (file.files && file.files[0])
          {
              div.innerHTML ='<img id=imghead>';
              var img = document.getElementById('imghead');
              img.onload = function(){
                var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
                img.width  =  rect.width;
                img.height =  rect.height;
//                 img.style.marginLeft = rect.left+'px';
                img.style.marginTop = '0px';
              }
              var reader = new FileReader();
              reader.onload = function(evt){img.src = evt.target.result;}
              reader.readAsDataURL(file.files[0]);
          }
          else //兼容IE
          {
            var sFilter='filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
            file.select();
            var src = document.selection.createRange().text;
            div.innerHTML = '<img id=imghead>';
            var img = document.getElementById('imghead');
            img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
            var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
            status =('rect:'+rect.top+','+rect.left+','+rect.width+','+rect.height);
            div.innerHTML = "<div id=divhead style='width:"+rect.width+"px;height:"+rect.height+"px;"+sFilter+src+"\"'></div>";
          }
        
          
          
        }
        function clacImgZoomParam( maxWidth, maxHeight, width, height ){
            var param = {top:0, left:0, width:width, height:height};
            if( width>maxWidth || height>maxHeight )
            {
                rateWidth = width / maxWidth;
                rateHeight = height / maxHeight;
                 
                if( rateWidth > rateHeight )
                {
                    param.width =  maxWidth;
                    param.height = Math.round(height / rateWidth);
                }else
                {
                    param.width = Math.round(width / rateHeight);
                    param.height = maxHeight;
                }
            }
            
            param.left = Math.round((maxWidth - param.width) / 2);
            param.top = Math.round((maxHeight - param.height) / 2);
            return param;
        }
        function clearimage(){
      	  var obj = document.getElementById('preview1') ; 
      	  obj.outerHTML=obj.outerHTML; 
      	  document.getElementById('preview').innerHTML =''; 
      	document.getElementById('filecancel1').innerHTML =''; 
        }
      //  function looktext(){
      //  	document.getElementById('modal-one').innerHTML ='*请填写真实姓名';
      //  }
      //  function cleartext(){
     //   	var $span = $('#modal-name').val();
       // 	if($span == ""){
        //		$('#modal-one').text('*不能为空'); 
        	//}else{
        		//$('#modal-one').text(''); 
        //	}
        	
       // } onfocus="looktext()" onblur="cleartext()"
</script>
    <!-- Demo page code -->
    
    <style type="text/css">
        #line-button {
            height:300px;
            width:800px;
            margin: 0px auto;
            margin-top: 1em;
        }
        .brand { font-family: georgia, serif; }
        .brand .first {
            color: #ccc;
            font-style: italic;
        }
        .brand .second {
            color: #fff;
            font-weight: bold;
        }
    </style>

    <!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

    <!-- Le fav and touch icons -->
    <link rel="shortcut icon" href="../assets/ico/favicon.ico">
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="../assets/ico/apple-touch-icon-144-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="../assets/ico/apple-touch-icon-114-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="../assets/ico/apple-touch-icon-72-precomposed.png">
    <link rel="apple-touch-icon-precomposed" href="../assets/ico/apple-touch-icon-57-precomposed.png">
    
  </head>

  <!--[if lt IE 7 ]> <body class="ie ie6"> <![endif]-->
  <!--[if IE 7 ]> <body class="ie ie7"> <![endif]-->
  <!--[if IE 8 ]> <body class="ie ie8"> <![endif]-->
  <!--[if IE 9 ]> <body class="ie ie9"> <![endif]-->


  <body> 
   
    <div class="navbar" >
        <div class="navbar-inner">
            <div class="container-fluid" >
            
                <ul class="nav pull-right">
                    
                    <li id="fat-menu" class="dropdown">
                        <a href="#" id="drop3" role="button" class="dropdown-toggle" data-toggle="dropdown" style="padding-top:20px">
                            <i class="icon-user"></i>欢迎<span id="userName"></span>
                            <i class="icon-caret-down"></i>
                        </a>

                        <ul class="dropdown-menu">                         
                            <li class="divider"></li>
                            <li><a tabindex="-1" href="user_logout.action">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&nbsp;&nbsp;注销&nbsp;&nbsp;]</a></li>
                        </ul>
                    </li>
                    
                </ul>
                <a class="brand" href="index.action"><span class="first" style="font-size:20px">AreTalk-FM</span></a>
            </div>
        </div>
    </div>


    <div class="container-fluid">
        </div><!-- 不确定有啥用 万一有错看看这  我加了一个/div哈哈哈 -->
        <div class="row-fluid">
            <div class="span3" >
                <div class="sidebar-nav" style=" padding-left: 20px;">
                  <div class="nav-header" data-toggle="collapse" data-target="#dashboard-menu"><i class="icon-dashboard"></i>FM</div>
                    <ul id="dashboard-menu" class="nav nav-list collapse in">
                        <li ><a href="index.action">首页</a></li>
                        <li ><a href="FmFileProcessed.action">电台目标文件</a></li>
                        <li ><a href="FmFilePendingInfo.action">源文件配置表</a></li>
                        <li ><a href="FmPlayMax.action">最大频道播放</a></li>
                        <li ><a href="FmFilePending.action">电台源文件播放表</a></li>                   
                    </ul>
               
               <div class="nav-header" data-toggle="collapse" data-target="#legal-menu"><i class="icon-legal"></i>音频</div>
                <ul id="legal-menu" class="nav nav-list collapse in">
                  <li ><a href="privacy-policy.action">待审核文件&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                            &nbsp;&nbsp;&nbsp;
                                                           
                  <span id="auditcount" class="label label-warning"></span></a></li>
                  <li ><a href="terms-and-conditions.action">音频文件库</a></li>
                   <li ><a href="AuditNoticeRecord.action">审核通信记录</a></li>
                  <li class="active"><a href="uploadfile.action">上传音频文件</a></li>
                </ul>
                 <div class="nav-header" data-toggle="collapse" data-target="#settings-menu"><i class="icon-exclamation-sign"></i>Error Pages</div>
                <ul id="settings-menu" class="nav nav-list collapse in">
                  <li ><a href="">403 page</a></li>
                  <li ><a href="">404 page</a></li>
                  <li ><a href="">500 page</a></li>
                  <li ><a href="">503 page</a></li>
                </ul>
            </div>
        </div>
        <div class="span9">
            <script type="text/javascript" src="lib/jqplot/jquery.jqplot.min.js"></script>
<script type="text/javascript" charset="utf-8" src="javascripts/graphDemo.js"></script>


<div class="row-fluid">
    <div class="block"  style="width : 1000px;height : 650px;">
    
        <p class="block-heading" data-toggle="collapse" data-target="#chart-container">音频文件信息</p>
        <div id="chart-container" class="block-body collapse in" >
            <div id="line-button" style="width : 1000px;height : 500px;">
                <div class="modal-text-" style="float: left; font-size: 16px; width:90px">
                         <p style="margin:0px 0px 0px 50px;line-height:40px"><span>作者</span></p>
                         <p style="margin:0px 0px 0px 20px;line-height:30px"><span>内容类别</span></p>
                         <p style="margin:0px 0px 0px 20px;"><span>语言类别</span></p>                         
                         <p style="margin:0px 0px 0px 50px;"><span>标题</span></p>
                         <p style="margin:0px 0px 0px 20px;line-height:20px"><span>上传配图</span></p>
                         <p style="margin:100px 0px 0px 20px;line-height:50px"><span>上传音频</span></p>
                         <p style="margin:0px 0px 0px 20px;line-height:15px"><span>正文说明</span></p>
                         <p style="margin:0px 0px 0px 50px;"><span>字幕</span></p>
                         </div>                         
                         <div class="modal-text-" style="float: left; width : 800px;">
                            <p style="margin:5px 0;">
                           <input class="modal-name" id="modal-name" style="width : 85px;"><span id="modal-one" ></span>
                           </p>
                         <div>
				<select class="form-control" placeholder="pendingFileId" id="txt_pendingFileIdname1">
					<option id="channelName">请选择--</option>			               
		        </select>
				</div>
                  <div>
				<select class="form-control" placeholder="pendingFileId" id="txt_languageInfoname">
					<option id="channelName">请选择--</option>			              						    
		        </select>
				</div>
                         <p style="margin:3px 0;"><input class="modal-title" id="modal-title" style="width : 800px;" value=""></p>                         
                         <!-- 隐藏标签 -->                  
                         <!-- 上传图片 -->
                         <input type="file" id="preview1" name="imageUpload" onchange="previewImage(this)" />  <span id="filecancel1"></span>
                         
                        <div id="preview">
                         <img id="imghead">
                        </div>                                                                                                        
                         <input type="file" name="fileToUpload" id="fileToUpload" style="width:350px" onchange="fileSelected();"/>
                        
                         
                         <span id="progressNumber"></span>                     
                         <span id="fileSize"></span>
                         <span id="fileType"></span>
                         <span id="filecancel"></span>                      
                         <div class="row">
                         </div>
                                                                                        
                         <p style="margin:5px 0;"><input class="modal-expl" id="modal-expl" style="width : 800px;"></p>
                         <p style="margin:0 0 0 0;"><textarea name="yj" id="text_area" clos="30" rows="10" style="width:790px;height:120px"></textarea></p>
                         <p><input type="checkbox"><a data-toggle="modal" data-target="#myModal"><span style="font-size:12px">《我已认真阅读并同意。。。协议》</span></a></p>                     
                         <p><div type="button" onclick="uploadFile()" class="btn btn-danger btn-sm" id="submit">提交</div>
                         <div type="button" class="btn btn-danger btn-sm" id="clear">取消</div></p>
                         </div>             
				
           <div class="block-textleft" style="width:510px;height:210px;" >
                
           </div>
               
        </div>
    </div>
</div>
        </div>
    </div>
    <!-- 弹框 -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog">
               <div class="modal-header"><button class="close" type="button" data-dismiss="modal">x</button>
                        <h3 id="myModalLabel">协议</h3>
                </div>
         <div class="modal-body">
                  
                       <h1>假装有字</h1>                                            
                 </div>
                         <div class="modal-footer" align="center">                          
                            <button type="button" data-dismiss="modal">关闭</button>         
                            </div>
                        </div>
                         </div>
    <!-- Le javascript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="lib/bootstrap/js/bootstrap.js"></script>
    
    <script type="text/javascript">
    //上传文件
      var dt = null;
      function fileSelected() {
        var file = document.getElementById('fileToUpload').files[0];
        if (file) {
          var fileSize = 0;
          if (file.size > 1048576){
            fileSize = (Math.round(file.size/1048576)).toString() + "MB";
          }
          else{
            fileSize = (Math.round(file.size/1024)).toString() + "KB";
          }
          document.getElementById('fileSize').innerHTML = 'Size: ' + '&nbsp;&nbsp;&nbsp;<input style="width:80px;" disabled="disabled" value='+fileSize+'>';
          document.getElementById('fileType').innerHTML = 'Type: ' + '&nbsp;&nbsp;<input style="width:150px;" disabled="disabled" value='+file.type+'>';
          document.getElementById('filecancel').innerHTML = '&nbsp;&nbsp;<button onclick="clearfile()" type="button">取消</button>';
        }else{
        	 document.getElementById('fileSize').innerHTML ='';
             document.getElementById('fileType').innerHTML = '';
             document.getElementById('filecancel').innerHTML = '';
             document.getElementById('progressNumber').innerHTML ='';
        }
      }

      function clearfile(){
    	  var obj = document.getElementById('fileToUpload') ; 
    	  obj.outerHTML=obj.outerHTML; 
    	  document.getElementById('fileSize').innerHTML ='';
          document.getElementById('fileType').innerHTML = '';
          document.getElementById('filecancel').innerHTML = '';
          document.getElementById('progressNumber').innerHTML ='';
          
      }
      function uploadFile() {  
    	  alert("nihaoa");
    	  var filekindId = $('#txt_pendingFileIdname1').val();//文件类型
    	  var expl = $('#modal-expl').val();//解释说明
    	  var subtitle = $('#text_area').val();//字幕
    	  var title = $('#modal-title').val();//标题
    	  var realName =$('#modal-name').val();//真实姓名
    	  var languageId = $('#txt_languageInfoname').val();//语言id    	  
    	 // var userId = $('#txt_pendingFileIdname1').val;//作者id
    	  
    	 //在这写上传图片文件
         var imagefile = document.getElementById('preview1').files[0];   	
  	    var fdimage = new FormData();
  	    fdimage.append("preview1", document.getElementById('preview1').files[0]);
  	    var imageUpload = new XMLHttpRequest();
  	  //  imageUpload.upload.addEventListener("progress", uploadProgress, false);
  	    imageUpload.addEventListener("load", uploadimageComplete, false);
  	    imageUpload.addEventListener("error", uploadFailed, false);
  	    imageUpload.addEventListener("abort", uploadCanceled, false);
  	    imageUpload.open("POST", "/AreTalkFM/Servlet/UploadHandleServlet?sign=2",false);
  	    imageUpload.send(fdimage);
  	    
  	  
  	    var fd = new FormData();
        fd.append("fileToUpload", document.getElementById('fileToUpload').files[0]);      
        var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener("progress", uploadProgress, false);
        xhr.addEventListener("load", uploadComplete, false);
        xhr.addEventListener("error", uploadFailed, false);
        xhr.addEventListener("abort", uploadCanceled, false);
      //后面的false是同步异步属性
      //同步  运行完毕进行下一步操作  异步  运行的同时进行下一步操作
      xhr.open("POST", "/AreTalkFM/Servlet/UploadHandleServlet?sign=1",false);
      xhr.send(fd);
      
            $.ajax({           
                type : 'POST',
                url : "AddAuditFile.action",			                     
                dataType : 'JSON',
                data: {
                   	'filekindId' : filekindId,
                   	'expl' : expl,
                   	'subtitle' : subtitle,
                   	'title' : title,
                   	'realName' : realName,
                   	
                   	'languageId' : languageId,               
                    },
                success : function(data) { 
                	//刷新页面   dt.ajax.reload(); 	
               	 alert("提交完成，等待审核");
               	dt.ajax.reload();
                   },
                error : function() {
               	 alert("后院砸烂了");
                   }
                  });
       
       
       // if (file) {
        	
       // }else{
        //	document.getElementById('progressNumber').innerHTML ='';
       // }
        
      }

      function uploadProgress(evt) {
        if (evt.lengthComputable) {
          var percentComplete = Math.round(evt.loaded * 100 / evt.total);
          document.getElementById('progressNumber').innerHTML = percentComplete.toString() + '%';
          var progressBar = document.getElementById('#progressBar');  
          var percentageDiv = document.getElementById('#percentage');  
         if (evt.lengthComputable) {  
         progressBar.max = evt.total;  
         progressBar.value = evt.loaded;  
         percentageDiv.innerHTML = Math.round(evt.loaded / evt.total * 100) + '%';  
       } 
        }
        else {
          document.getElementById('progressNumber').innerHTML = 'unable to compute';
        }
      }

      function uploadimageComplete(evt) {
        /* This event is raised when the server send back a response */
        //alert(evt.target.responseText);
          alert("图片上传成功");
        
      }
      function uploadComplete(evt) {
          /* This event is raised when the server send back a response */
          //alert(evt.target.responseText);
            alert("文件上传成功");
          
        }

      function uploadFailed(evt) {
        alert("There was an error attempting to upload the file.");
      }

      function uploadCanceled(evt) {
        alert("The upload has been canceled by the user or the browser dropped the connection.");
      }
      
    </script>
   
  </body>
</html>


