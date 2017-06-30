<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	<%@page import="server.api.model.fm.AuditNoticeRecord"%> 
	<%@page import="java.util.List"%> 
<%@taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>AreTalk FM后台管理</title>
    <meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <link rel="stylesheet" type="text/css" href="lib/bootstrap/css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="lib/bootstrap/css/bootstrap-responsive.css">
  
    <link rel="stylesheet" href="lib/font-awesome/css/font-awesome.css">
  <link rel="stylesheet" type="text/css" href="stylesheets/theme.css">
    <script src="lib/jquery-1.8.1.min.js" type="text/javascript"></script>
    <!-- Demo page code -->
  <script type="text/javascript">  
     $(document)
			.ready(
					function() {

						//获取频道列表
						 $.ajax({
							   async: false,
		                       type : 'POST',
		                       url : "GetFmPlayMax.action",			                     
		                       dataType : 'JSON',
		                       success : function(data) {
		                    	   var alert_channelId = $("#alert_channelId");
		                    	   var str = '';
		                    	   for(var o in data.FmPlayMaxName) {	                    		
		                    			str = "<option onclick='channelList()' style='border:0px solid black;' value='"+data.FmPlayMaxName[o].channelId+"'>" + data.FmPlayMaxName[o].channelName + "</option>"			
		                    			 $("#alert_channelId").append(str);	
		                    	   }		  
		                          },
		                       error : function() {		
		                    	   alert("频道获取失败");
		                          }
	                             });
						//获取待审核文件数
						
						$.ajax({
							   async: false,
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
						var channelIdName = $('#alert_channelId').val();
						 //根据当前时间获取播放文件         
	                    $.ajax({ 
	                    	   async: false,	                    
		                       type : 'POST',
		                       url : "getFileByZone.action",			                     
		                       dataType : 'JSON',
		                       data : {
		                    	   'channelId': channelIdName
		                       },
		                       success : function(data) {    
		                    	   alert("路径"+data.fmfileprocessed.targetPath);
		                    	   $("#channelidImg").attr({ src:data.fmfilependinginfo.pendingFileImage});     // data.fmfilependinginfo.pendingFileImage
		                    	   $("#play").attr({ src:"Image/bofang.png",onclick:"changeplay()" });
		                    	  // $("#myAudioSource").attr({ src:data.fmfileprocessed.targetPath});  //  data.fmfileprocessed.targetPath
		                    	//  document.getElementById("myAudioSource").src = data.fmfileprocessed.targetPath;
		                    	// $("#myAudioSource").attr( "src",data.fmfileprocessed.targetPath);
		                    	   document.getElementById('fileName').innerHTML = data.fmfilepending.fileTitle;
		                    	   document.getElementById('fileType').innerHTML = data.fmfilepending.fileKindId;
		                    	   document.getElementById('fileLg').innerHTML = "假的";
		                    	   document.getElementById('onliner').innerHTML = data.fmfilepending.onliner+"人";
		                    	   document.getElementById('fileExpl').innerHTML = data.fmfilepending.expl;
		                    	   document.getElementById('filechannelName').innerHTML = data.fmfilepending.channelId;
		                    	   
		                          },
		                       error : function() {	
		                    	   alert("获取频道信息失败");
		                          }
	                             });
	                             })

	                             </script>
	                             
	                            
	                             
   <script type="text/javascript">
   
     function cleancache(){
    	 alert("开始清理缓存");
    	 var cachehour = $('#cleancacheid').val();
 
	   $.ajax({
           type : 'POST',
           url : "CleanCache.action",			                     
           dataType : 'JSON',
           data: {
             	'cachehour' : cachehour m           	            
              },
           beforeSend: function () {
                  // 禁用按钮防止重复提交
                  $("#cleanId").attr({ disabled: "disabled", style:"background:#f00;height:50px;width:200px",value:"正在清除缓存"});
              },
           success : function(data) {
        	    alert("清理完毕");
              },
           complete: function () {
                  $("#cleanId").removeAttr("disabled","background:#f00");
                  $("#cleanId").attr({style:"height:50px;width:200px",value:"清除缓存"});
               },
           error : function() {		
        	alert("请求成功怎么会走这个error？");
              }
             });
    }
    //网页版fm
         function changeplay(){
        	 $("#play").attr({ src:"Image/zhanting.png",onclick:"startplay()" });   
        	 $("#channelidImg").attr({ class:"channelidImgclass" });  
        	 var music=document.getElementById("myAudio");
        	 music.play();
         }
         function startplay(){
        	 $("#play").attr({ src:"Image/bofang.png",onclick:"changeplay()" }); 
        	 $("#channelidImg").removeClass("channelidImgclass"); 
        	 var music=document.getElementById("myAudio");
        	 music.pause();
         }
         function channelList(){
        	 alert("点击有效果");
         }
   </script>
    <style type="text/css">
        #line-button {
            height:300px;
            width:600px;
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
        td {
            border:0px;
        }
        .channelidImgclass{
        -webkit-animation:run 8s linear 0s infinite; 
        }

        @-webkit-keyframes run{     
            from{     
                -webkit-transform:rotate(0deg);     
            }     
            to{     
                -webkit-transform:rotate(360deg);     
            }     
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
                        <a id="drop3" role="button" class="dropdown-toggle" data-toggle="dropdown" style="padding-top:20px;padding-right:50px">
                            <i class="icon-user"></i>欢迎<span id="userName"></span>
                            <i class="icon-caret-down"></i>
                        </a>

                        <ul class="dropdown-menu">                         
                            <li class="divider"></li>
                            <li><a tabindex="-1" href="user_logout.action" style="font-size:16px" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&nbsp;&nbsp;注销&nbsp;&nbsp;]</a></li>
                        </ul>
                    </li>
                    
                </ul>
                <a class="brand" href="index.action"><span class="first" style="font-size:20px">AreTalk-FM</span></a>
            </div>
        </div>
    </div>


    <div class="container-fluid" >
        
        <div class="row-fluid">
            <div class="span3" >
                <div class="sidebar-nav">
                  <div class="nav-header" data-toggle="collapse" data-target="#dashboard-menu"><i class="icon-dashboard"></i>FM</div>
                    <ul id="dashboard-menu" class="nav nav-list collapse in">
                        <li class="active"><a href="index.action">首页</a></li>
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
                  <li ><a href="uploadfile.action">上传音频文件</a></li>
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
    <div class="block">
        <p class="block-heading" data-toggle="collapse" data-target="#chart-container">FM线程状态</p>
        <div id="chart-container" class="block-body collapse in">
        <!-- fm播放器 autoplay="autoplay"-->
        <div id="" class="" style="height:300px;width:700px;float:left;margin-top:20px;margin-left:20px;">
        
        <div id="" class="" style="width:160px;height:160px;float:left;border-radius:150px;position: relative;">

		      <img id="play" src="Image/bofang.png" style="width:36px;height:36px;float:left;position:relative;top:100px;left:50px;color:#fff;z-index:99999;top:70px;">
	        
              <img id="channelidImg" style="width:150px;height:150px;border-radius:150px;float:left;right:8px;position:relative;top:-20px;">
             
              </div>
        
        <div id="" class="" style="width:500px;height:170px;float:left;">
              <span style="font-size:15px;margin-left:18px">节目名称:&nbsp;&nbsp;&nbsp;&nbsp;<span id="fileName"></span></span>
              
             <p> <span style="font-size:15px;margin-left:18px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;种类:&nbsp;&nbsp;&nbsp;&nbsp;<span id="fileType"></span></span></p>
             <p> <span style="font-size:15px;margin-left:18px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;语言:&nbsp;&nbsp;&nbsp;&nbsp;<span id="fileLg"></span></span></p>
             <p> <span style="font-size:15px;margin-left:18px">在线人数:&nbsp;&nbsp;&nbsp;&nbsp;<span id="onliner"></span></span></p>
            <!-- <p > <span style="font-size:15px;margin-left:18px;float:left">详细介绍:</span><textarea id="fileExpl" rows="4" cols="15" disabled="disabled" style="width:300px;margin-left:10px;"></textarea></p> --> 
              <!-- 播放器 -->
              <audio id="myAudio" controls="controls" >
      
              <source id="myAudioSource"  src="/FM/1/201704011019484" type="audio/mpeg"><!-- src="/FM/1/2017040113224113" -->
              </audio>
              
              <script>
                   var aud = document.getElementById("myAudio1");
                       aud.onended = function(){
                    	   alert("音频已播放完成");
                    	   $.ajax({  							
		                       type : 'POST',
		                       url : "getFileByZone.action",			                     
		                       dataType : 'JSON',		                       
		                       success : function(data) {
		                    	   $("#channelidImg").attr({ src:data.fmfilependinginfo.pendingFileImage});     // data.fmfilependinginfo.pendingFileImage
		                    	   $("#play").attr({ src:"Image/bofang.png",onclick:"changeplay()" });
		                    	  // $("#myAudioSource").attr({ src:data.fmfileprocessed.targetPath});  //  data.fmfileprocessed.targetPath			                  	  
		                    	   $("#myAudio").attr({ autoplay:"autoplay" });
		                    	   document.getElementById('fileName').innerHTML = data.fmfilepending.fileTitle;
		                    	   document.getElementById('fileType').innerHTML = data.fmfilepending.fileKindId;
		                    	   document.getElementById('fileLg').innerHTML = "假的";
		                    	   document.getElementById('onliner').innerHTML = data.fmfilepending.onliner+"人";
		                    	   document.getElementById('fileExpl').innerHTML = data.fmfilepending.expl;
		                    	   document.getElementById('filechannelName').innerHTML = data.fmfilepending.channelId;
		                          },
		                       error : function() {				                 				                   
		                          }
	                             });
                    	   
                                               };
              </script>
              <!-- 播放器 -->
              </div>
        
        <div id="" class="" style="width:150px;height:80px;text-align:center;padding-top:190px;">                                                           
								<select class="form-control"  id="alert_channelId"  style="border:0px solid black;">								
					               			              						    
		                        </select>
        </div>
         
        
        </div> 
        <!-- fm播放器 -->
            <div id="line-button" style="float:right;">
                 <div id="line-text">              
                   <p><input type="text" id="cacheTime" onblur="Text_cacheTime1()" onfocus="Text_cacheTime()" value="*频道缓存时间（毫秒）" style="height:40px;width:185px" />
                   <input type="text" id="size" onblur="Text_size1()" onfocus="Text_size()" value="*文件大小" style="height:40px;width:185px" /></p>
                 </div>                
                
               <div id="line-button1">
                <input type="button" id="StartFM" value="启动FM线程" style="height:50px;width:200px"/>
                <input type="button" onclick="" value="关闭FM线程" style="height:50px;width:200px"/>             
               </div>   
                  <div>
                <input type="text" id="cleancacheid" placeholder="清除缓存（小时）" style="height:40px;width:185px;margin-top:10px"/>
                <input type="button" id="cleanId" onclick="cleancache()" value="清除缓存" style="height:50px;width:200px" />               
               </div>       
            <h1>&nbsp;———高危地带———</h1>
        </div>
    </div>
</div>

<div class="row-fluid">
    <div class="block span6" >
        <div class="block-heading" data-toggle="collapse" data-target="#widget2container">操作记录  
        <span class="label label-warning">显示七天的操作记录</span> 
        </div>
        
        
        <div id="widget2container" class="block-body collapse in" >
           <div class="span9">
           <div class="panel-body">
		<p>
		<div class="form-inline">
			<div style="width: 100%;">
				<table style="width: 900px;">
					<tr>								
						<td>
							
						</td>

					</tr>
				</table>
			</div>
		</div>

		<div id="table_wrapper"
			class="dataTables_wrapper form-inline dt-bootstrap no-footer">

			<table width="630px"
				class="table table-striped table-bordered table-hover dataTable no-footer dtr-inline"
				id="table_fmoperationrecord" role="grid" style="width: 600px;">
				<thead>
					<tr role="row" style="border-right:0;">						
						<th class="sorting" aria-controls="table_fmoperationrecord"
							style="width: 50px;"></th>
						<th class="sorting" aria-controls="table_fmoperationrecord"
							style="width: 50px;"></th>
						<th class="sorting" aria-controls="table_fmoperationrecord"
							style="width: 250px;"></th>
						<th class="sorting" aria-controls="table_fmoperationrecord"
							style="width: 350px;"></th>
						
					</tr>
				</thead>
				<tbody>
				</tbody>
			</table>
		</div>
	</div>
	<!-- <div id="to_top"><img src="Image/top.jpg"/></div> -->
    </div>
        </div>
    </div>
    <div class="block span6">
        <p class="block-heading">备注信息</p>
        <div class="block-body">
             <div class="block-textleft" style="width:510px;height:210px;float: left;" >
           <p><textarea name="yj" id="text_area" clos="30" rows="10" style="width:500px;height:200px"></textarea></p>
             </div>
              <div class="block-textright" style="height:210px;float: left;">
              <p><input type="button" onClick="clear_text()" value="清除内容"/></p>
              </div>
            <p><a class="btn btn-primary btn-large">&raquo; 保存 &raquo;</a></p>
        </div>
    </div>
</div>
        </div>
    </div>
    </div>
    </div>
    
    <!-- Le javascript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="lib/bootstrap/js/bootstrap.js"></script>
        <!-- Le javascript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="lib/bootstrap/js/bootstrap.js"></script>
    <!-- jQuery -->
<script src="resource/lib/jquery/1.9.1/jquery.min.js"></script>
<!-- Bootstrap Core JavaScript -->
<script src="resource/lib/bootstrap/js/bootstrap.min.js"></script>
<script
	src="resource/lib/bootstrap3-editable/js/bootstrap-editable.js"></script>

<!-- Metis Menu Plugin JavaScript -->
<script src="resource/lib/sbadmin/vendor/metisMenu/metisMenu.min.js"></script>

<!-- DataTables JavaScript -->
<script
	src="resource/lib/sbadmin/vendor/datatables/js/jquery.dataTables.min.js"></script>

<script
	src="resource/lib/sbadmin/vendor/datatables-responsive/dataTables.responsive.js"></script>

<!-- Custom Theme JavaScript -->
<script src="resource/lib/sbadmin/dist/js/sb-admin-2.js"></script>


<script type="text/javascript">
	if (top.location != location) {
		top.location.href = document.location.href;
	}

	function edit(i){
		$.ajax({
			type : 'POST',
			url : "ModifyFmOperationRecord.action",
			data : curRow[i],
			dataType : 'JSON',
			success : function(data, textStatus, jqXHR) {
				alert('Update Success');
			},
			error : function() {
				alert("Server Error!");
			}
		});
	}
	
	var nowTemp = new Date();
	var curRow = [];
	$("#minDate").attr("data-date",
			nowTemp.toDateString().replace("/", "-").replace("/", "-"));
	$("#maxDate").attr("data-date",
			nowTemp.toDateString().replace("/", "-").replace("/", "-"));
	$('#minDate').datepicker();
	$('#maxDate').datepicker();
	// disabling dates


 $(document)
			.ready(
					function() {
						          
						//alert("hhahaha");
								var dt = null;
								dt = $('#table_fmoperationrecord')
															.DataTable(
											{	
											"searching" : false,
											"bProcessing" : false,
											"bServerSide" : true,

											"fnDrawCallback" : function(
													oSettings) {
												
												var api = this.api();
												var startIndex = api.context[0]._iDisplayStart;
												//获取到本页开始的条数 　　
												
											},
												
												"aLengthMenu" : [
													[ 5, 10, 25, 50, -1 ],
													[ 5, 10, 25, 50, 51 ] ],

												"aaSorting" : [ [ 1, "desc" ] ],//默认第几个排序
												"bStateSave" : true,//状态保存

											"fnServerParams" : function(aoData) { //查询条件
												aoData
														.push(
																
																{
																	"name" : "minRegistryTime",
																	"value" : $(
																			"#minRegistryTime")
																			.val()
																},
																{
																	"name" : "maxRegistryTime",
																	"value" : $(
																			"#maxRegistryTime")
																			.val()
																}
														//{"name": "EventContent", "value": $("#EventContent").val()}
														);
											},

											"sAjaxSource" : "FmOperationRecord.action?rand="
													+ Math.random(),

											"columnDefs" : [
													
													{
														"targets" : [ 0 ],
														"data" : "id",
														"orderable" : true,
														"render" : function(
																data, type,
																full) {
															return data;
														}
													},
													{
														"targets" : [ 1 ],
														"data" : "userId",
														"orderable" : true,
														"render" : function(
																data, type,
																full) {
															return data;
														}
													},
													{
														"targets" : [ 2 ],
														"data" : "operateTime",
														"orderable" : true,
														"render" : function(
																data, type,
																full) {
															return data;
														}
													},
													{
														"targets" : [ 3 ],
														"data" : "operateContent",
														"render" : function(
																data, type,
																full) {
															return data;
														}
													} ]

										});

						$("#btn_search").click(function() {
							dt.ajax.reload();
						});

					});
</script>
    <script>
    function clear_text(){
    	
    }
   
    function Text_cacheTime() {
    	$("#cacheTime").val("");  	
    }
    function Text_size() {
    	$("#size").val("");  	
    }
    function Text_cacheTime1() {
    	var cacheTime = $("#cacheTime").val();
    	if (cacheTime = null){
    		$("#cacheTime").val("*频道缓存时间（毫秒）");  	
    	}
    	
    }
    function Text_size1() {
    	var size = $("#size").val();
    	if (size = null){
    		$("#size").val("*文件大小");  	
    	}
    	
    }
    
    </script>
    <script>
$("#StartFM").click(function(){
	
	var cacheTime = $("#cacheTime").val();
	var size = $("#size").val();
	if (cacheTime == null || size == null ){
		alert("参数缺失");
	}else{
		$.ajax({
			url : 'getMp3.action',
			type : 'POST',
			dataType : 'json',
			data :{
				'cacheTime' : cacheTime,
				'size' : size			
			},
			success : function(data) {
				if (data.errMsg == "success") {	
					alert("success");
				} else if (data.errMsg == "fail") {	
					alert("fail");
				}							
			}

		});
	}
		
})
</script>

  </body>
</html>
