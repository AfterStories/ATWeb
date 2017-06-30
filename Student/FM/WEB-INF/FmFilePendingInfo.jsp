<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	<%@page import="server.api.model.fm.FmFilePendingInfo"%> 
	<%@page import="java.util.List"%> 
<%@taglib prefix="s" uri="/struts-tags"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
  <head>
  <!-- Bootstrap Core CSS -->
<link
	href="resource/lib/bootstrap3-editable/css/bootstrap-editable.css"
	rel="stylesheet">
<link href="resource/lib/bootstrap/css/bootstrap.min.css"
	rel="stylesheet">
<link href="resource/lib/bootstrap/css/bootstrap-theme.css"
	rel="stylesheet">
<!-- MetisMenu CSS -->
<link href="resource/lib/sbadmin/vendor/metisMenu/metisMenu.min.css"
	rel="stylesheet">
<!-- DataTables Responsive CSS -->
<link
	href="resource/lib/sbadmin/vendor/datatables-responsive/dataTables.responsive.css"
	rel="stylesheet">
<!-- Custom CSS -->
<link href="resource/lib/sbadmin/dist/css/sb-admin-2.css"
	rel="stylesheet">
<!-- Custom Fonts -->
<link
	href="resource/lib/sbadmin/vendor/font-awesome/css/font-awesome.min.css"
	rel="stylesheet" type="text/css">
	
    <meta charset="utf-8">
    <title>AreTalk FM后台管理</title>
    <meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <link rel="stylesheet" type="text/css" href="lib/bootstrap/css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="lib/bootstrap/css/bootstrap-responsive.css">
    <link rel="stylesheet" type="text/css" href="stylesheets/theme.css">
    <link rel="stylesheet" href="lib/font-awesome/css/font-awesome.css">

    <script src="lib/jquery-1.8.1.min.js" type="text/javascript"></script>

    <!-- Demo page code -->
     <script type="text/javascript">  
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
	                             })
	                             </script>
    <style type="text/css">
        #line-chart {
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
    <style>
       #to_top{width:60px; 
               height:60px; 
               padding:60px; 
               font:14px/20px arial; 
               text-align:left;  
               background:#06c; 
               position:absolute; 
               cursor:pointer; 
               }
    </style>
    <script>
     window.onload = function(){
     var oTop = document.getElementById("to_top");
     var screenw = document.documentElement.clientWidth || document.body.clientWidth;
     var screenh = document.documentElement.clientHeight || document.body.clientHeight;
     oTop.style.left = screenw - oTop.offsetWidth +"px";
     oTop.style.top = screenh - oTop.offsetHeight + "px";
     window.onscroll = function(){
     var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
     oTop.style.top = screenh - oTop.offsetHeight + scrolltop +"px";
     }
     oTop.onclick = function(){
    document.documentElement.scrollTop = document.body.scrollTop =0;
  }
}  

</script>

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
  <!--[if (gt IE 9)|!(IE)]><!--> 
  <body> 
  <!--<![endif]-->
    
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
        
        <div class="row-fluid">
            <div class="span3">
                <div class="sidebar-nav">
                  <div class="nav-header" data-toggle="collapse" data-target="#dashboard-menu"><i class="icon-dashboard"></i>FM</div>
                    <ul id="dashboard-menu" class="nav nav-list collapse in">
                        <li ><a href="index.action">首页</a></li>
                        <li ><a href="FmFileProcessed.action">电台目标文件</a></li>
                        <li class="active"><a href="FmFilePendingInfo.action">源文件配置表</a></li>
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
           
	<div class="panel-body">
		<p>
		<div class="form-inline">
			<div style="width: 100%;">
				<table style="width: 900px;">
					<tr>
					<td>
							<div class="form-group input-group" style="width: 180px;">
								<span class="input-group-addon">文件名</span> <input type="text"
									class="form-control" placeholder="文件名" id="txt_pendingFileName" style="height:30px">
							</div>
						</td>
							
						
						<td>
							<div class="form-group input-group" style="width: 180px;">
								<span class="input-group-addon">源文件id号</span> <input type="text"
									class="form-control" placeholder="源文件id" id="txt_pendingFileId" style="height:30px">
							</div>
						</td>


						<td>
							<div class="form-group input-group" style="width: 180px;">
								<span class="input-group-addon">频道号</span> <input type="text"
									class="form-control" placeholder="频道号" id="txt_channelId" style="height:30px">
							</div>
						</td>
						
						<td>
							<div class="input-append date form-group" id="minDate"
								data-date-format="yyyy-mm-dd" style="width: 206px;">
								<table>
									<tr>
										<td><input class="form-control add-on" type="text"
											id="minRegistryTime" placeholder="起始日期" readonly=""
											style="width: 130px;height:30px;"></td>
										<td><span class="add-on" style="height:30px"> <img
												style="width: 33px; height: 26px;" class="fa fa-calendar"
												src="resource/lib/datepicker/img/calendar.png"></img>
										</span></td>
									</tr>
								</table>
							</div>

						</td>
						<td>
							<div class="input-append date form-group" id="maxDate"
								data-date-format="yyyy-mm-dd" style="width: 206px;">
								<table>
									<tr>
										<td><input class="form-control add-on" type="text"
											id="maxRegistryTime" placeholder="截至日期" readonly=""
											style="width: 130px;height:30px;"></td>
										<td><span class="add-on" style="height:30px"> <img
												style="width: 33px; height: 26px;" class="fa fa-calendar"
												src="resource/lib/datepicker/img/calendar.png"></img>
										</span></td>
									</tr>
								</table>
							</div>
						</td>

						<td>
							<div type="button" class="btn btn-danger btn-sm" id="btn_search">查询</div>
						</td>

					</tr>
				</table>
			</div>
		</div>
		</p>
		<div id="table_wrapper"
			class="dataTables_wrapper form-inline dt-bootstrap no-footer">

			<table width="100%"
				class="table table-striped table-bordered table-hover dataTable no-footer dtr-inline"
				id="table_fmfilePendinginfo" role="grid" style="width: 100%;">
				<thead>
					<tr role="row">
						<th class="sorting_asc" aria-controls="table_fmfilePendinginfo"
							aria-sort="ascending" style="width: 80px;"></th>
						<th class="sorting_asc" aria-controls="table_fmfilePendinginfo"
							aria-sort="ascending" style="width: 80px;">序号</th>
						<th class="sorting" aria-controls="table_fmfilePendinginfo"
							style="width: 80px;">id</th>
						<th class="sorting" aria-controls="table_fmfilePendinginfo"
							style="width: 80px;">频道id</th>
						<th class="sorting" aria-controls="table_fmfilePendinginfo"
							style="width: 80px;">源文件id</th>
						<th class="sorting" aria-controls="table_fmfilePendinginfo"
							style="width: 80px;">源文件名字</th>
						<th class="sorting" aria-controls="table_fmfilePendinginfo"
							style="width: 80px;">源文件配图</th>
						<th class="sorting" aria-controls="table_fmfilePendinginfo"
							style="width: 80px;">状态</th>
						<th class="sorting" aria-controls="table_fmfilePendinginfo"
							style="width: 80px;">操作</th>
					</tr>
				</thead>
				<tbody>
				</tbody>
			</table>
		</div>
	</div>
	<div id="to_top"><img src="Image/top.jpg"/></div>
    </div>
    
        <!-- Le javascript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="lib/bootstrap/js/bootstrap.js"></script>
<!-- jQuery -->
<script src="resource/lib/jquery/1.9.1/jquery.min.js"></script>
<!-- Bootstrap Core JavaScript -->
<script src="resource/lib/bootstrap/js/bootstrap.min.js"></script>6
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
			url : "ModifyFmFilePendingInfo.action",
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
								var dt = null;
								dt = $('#table_fmfilePendinginfo')
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
												api.column(1).nodes().each(
													function(cell,i) {
														cell.innerHTML = startIndex + i + 1;
													}
												);
												api.column(4).nodes().each(
														function(cell,i) {
															cell.innerHTML = "<a href='#' id='" + "tableCell_" + i + "_5" +"' data-type='text' data-title='pendingFileId'>" + cell.innerHTML + "</a>";
															$("#tableCell_" + i + "_5").editable({
																url : function(params) {
																	curRow[i]["id"] = dt.row(i).data()["id"];
																	curRow[i]["pendingFileId"] = params.value;
																}
															});
														});
												api.column(5).nodes().each(
														function(cell,i) {
															cell.innerHTML = "<a href='#' id='" + "tableCell_" + i + "_6" +"' data-type='text' data-title='pendingFileName'>" + cell.innerHTML + "</a>";
															$("#tableCell_" + i + "_6").editable({
																url : function(params) {
																	curRow[i]["id"] = dt.row(i).data()["id"];
																	curRow[i]["pendingFileName"] = params.value;
																}
															});
														});
												api.column(6).nodes().each(
														function(cell,i) {
															cell.innerHTML = "<a href='#' id='" + "tableCell_" + i + "_7" +"' data-type='text' data-title='pendingFileImage'>" + cell.innerHTML + "</a>";
															$("#tableCell_" + i + "_7").editable({
																url : function(params) {
																	curRow[i]["id"] = dt.row(i).data()["id"];
																	curRow[i]["pendingFileImage"] = params.value;
																}
															});
														});
												api.column(7).nodes().each(
														function(cell,i) {	
															cell.innerHTML = "<a href='#' id='" + "tableCell_" + i + "_10" + "' data-type='text' data-title='status'>" + cell.innerHTML + "</a>";
															$("#tableCell_" + i + "_10").editable({
																url : function(params) {
																	curRow[i]["id"] = dt.row(i).data()["id"];
																	curRow[i]["status"] = params.value;
																}
															});
														});
												api.column(8).nodes().each(
														function(cell,i) {	
															cell.innerHTML = '<div class="actions-hover actions-fade"><a href="javascript:void(0)" onclick="edit(' + i + ')"><i class="fa fa-pencil"></i></a></div>';
															curRow[i] = {};
														});
												
											},
												
												"aLengthMenu" : [
													[ 5, 10, 25, 50, -1 ],
													[ 5, 10, 25, 50, "All" ] ],

												"aaSorting" : [ [ 1, "desc" ] ],//默认第几个排序
												"bStateSave" : true,//状态保存

											"fnServerParams" : function(aoData) { //查询条件
												aoData
														.push(
																{
																	"name" : "pendingFileName",
																	"value" : $(
																			"#txt_pendingFileName")
																			.val()
																},
																{
																	"name" : "pendingFileId",
																	"value" : $(
																			"#txt_pendingFileId")
																			.val()
																},
																{
																	"name" : "channelId",
																	"value" : $(
																			"#txt_channelId")
																			.val()
																},
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

											"sAjaxSource" : "FmFilePendingInfoAction.action?rand="
													+ Math.random(),

											"columnDefs" : [
													{
														"targets" : [ 0 ],
														"data" : "index0",
														"orderable" : false,
														"render" : function(
																data, type,
																full) {
															return "<input type='checkbox' name='' value=''>";
														}
													},
													{
														"targets" : [ 1 ],
														"data" : "index1",
														"orderable" : false,
														"render" : function(
																data, type,
																full) {
															return "";
														}
													},
													{
														"targets" : [ 2 ],
														"data" : "id",
														"orderable" : true,
														"render" : function(
																data, type,
																full) {
															return data;
														}
													},
													{
														"targets" : [ 3 ],
														"data" : "channelId",
														"orderable" : true,
														"render" : function(
																data, type,
																full) {
															return data;
														}
													},
													{
														"targets" : [ 4 ],
														"data" : "pendingFileId",
														"orderable" : true,
														"render" : function(
																data, type,
																full) {
															return data;
														}
													},
													{
														"targets" : [ 5 ],
														"data" : "pendingFileName",
														"render" : function(
																data, type,
																full) {
															return data;
														}
													},
													{
														"targets" : [ 6 ],
														"data" : "pendingFileImage",
														"render" : function(
																data, type,
																full) {
															return "<img id='image1' src='"+data+"' style='height:75px;width:130px'/>";
														}
													},
													{
														"targets" : [ 7 ],
														"data" : "status",
														"render" : function(
																data, type,
																full) {
															return data;
														}
													},
													{
														"targets" : [ 8 ],
														"data" : "d10",
														"orderable" : false,
														"render" : function(
																data, type,
																full) {
															return null;
														}
													} ]

										});

						$("#btn_search").click(function() {
							dt.ajax.reload();
						});

					});
</script>
    


  </body>
</html>


