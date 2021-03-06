  

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
 


  var Sessionid = getCookie("JSESSIONID");
  var Lessonid = GetQueryString("Lessonid");
var myTable


layui.use(['layer', 'datatable', 'datatableButton', 'datatableFlash', 'datatableHtml5', 'datatablePrint', 'datatableColVis', 'datatableSelect'], function() {
  var $ = layui.jquery,
    layer = layui.layer;


  // oSort是排序类型数组, 'chinese-asc'是自己定义的类型的排序(*-asc || *-desc)名称
  // 插件应该会根据表格中的内容的类型(string, number, chinese)进行比较排序，
  // 如果以chinese类型来排序则用oSort['chinese-asc']和oSort['chinese-desc']的方法
  // oSort对应的function里面自定义比较方法
  $.fn.dataTableExt.oSort['chinese-asc'] = function(x, y) {
    //javascript自带的中文比较函数
    return x.localeCompare(y);
  };

  $.fn.dataTableExt.oSort['chinese-desc'] = function(x, y) {
    return y.localeCompare(x);
  };

  // aTypes是插件存放表格内容类型的数组
  // reg赋值的正则表达式，用来判断是否是中文字符
  // 返回值push到aTypes数组，排序时扫描该数组，'chinese'则调用上面两个方法。返回null默认是'string'
  $.fn.dataTableExt.aTypes.push(
    function(sData) {
      var reg = /^[\u4e00-\u9fa5]{0,}$/;
      if(reg.test(sData)) {
        return 'chinese';
      }
      return null;
    }
  );
  //datatables配置

              

  $(function() {




     myTable = $('#productTable').DataTable({
          
      "searching" : false,//搜索
      "bSort":true,
      "aaSorting": [[ 1, "asc" ]],//默认第几个排序,标示asc(升序)或desc(降序)
      "bProcessing" : true,//载入中
      "bServerSide" : true,//服务端模式
      "processing": true, //DataTables载入数据时，是否显示‘进度’提示  
      "stateSave": true, //是否打开客户端状态记录功能,此功能在ajax刷新纪录的时候不会将个性化设定回复为初始化状态  
      "scrollCollapse": true, //是否开启DataTables的高度自适应，当数据条数不够分页数据条数的时候，插件高度是否随数据条数而改变  
      "paginationType": "full_numbers", //详细分页组，可以支持直接跳转到某页
      "autoWidth": false, //自适应宽度，
      "stripeClasses": ["odd", "even"], //为奇偶行加上样式，兼容不支持CSS伪类的场合
      "searching": true, //是否允许Datatables开启本地搜索
      "paging": true, //是否开启本地分页
      "lengthChange": true, //是否允许课程改变表格每页显示的记录数
      "info": true, //控制是否显示表格左下角的信息
      select: {
        style: 'multi'
      },
      "fnServerData": function(sSource, aoData, fnCallback, oSettings){
            oSettings.jqXHR = $.ajax({
              "dataType":'json',
              "type":"GET",
              "url":sSource,
              "data":aoData,
              "success":function(data){
                if(data.errCode != null){
                  if(data.errCode == 500){
                    alert("请重新登录");
                    location.href="connet.action?jsp=main";
                    return;
                  }
                  else if(data.errCode != 0){
                    alert("请刷新后重试");
                    return;
                  }
                  
                }
                else{
                  alert("ERROR!!!!");
                  location.href="connet.action?jsp=main";
                }
                fnCallback(data);
              },
              "failure":function(){
                alert("timeout!");
              }
            });
          },

/*            "fnDrawCallback": function( oSettings ) {  
                var api = this.api();
                var startIndex = api.context[0]._iDisplayStart;
                //获取到本页开始的条数 　　
                api.column(1).nodes().each(function (cell, i) {
                    cell.innerHTML = startIndex + i + 1;
                });
            }, */
            "aLengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
           
            /*"bStateSave": true,//状态保存*/

            "fnServerParams": function (aoData) {  //查询条件
                aoData.push(
                    { "name": "lessonId", "value": Lessonid }
                    //{ "name": "level", "value": $("#sel_level").val() },
                    //{ "name": "regTimeMin", "value": $("#logmin").val() },
                    //{ "name": "regTimeMax", "value": $("#logmax").val() }
                    //{"name": "EventContent", "value": $("#EventContent").val()}
                );
            },

            "sAjaxSource": "http://211.159.152.210:8188/AreTalkServer/Web/Api/GetLessonTime.action;jsessionid="+Sessionid + "?rand=" + Math.random(), //分号贼重要！

            "columnDefs": [
     
              {
                "targets": [0],
                "data": "lessonId",
               
                "render": function (data, type, full) {
                    return data;
                }
            },
            {
                "targets": [1],
                "data": "classNo",
               
                "render": function(data) {
                    return data;
                }
            },
            {
                "targets": [2],
                "data": "startTime",
                "render": function(data, type, full) {
                    var ST = data.replace(/T/g,' ');
                    return ST;
                }
            },
            {
                "targets": [3],
                "data": "endTime",
                "render": function(data, type, full) {
                  var ET = data.replace(/T/g,' ');
                    return ET;
                }
            },
            {
                "targets": [4],
                "data": "title",
                "render": function (data, type, full) {
                    return data;
                }
            },
            {
                "targets": [5],
                "data": "lessonDescribe",
                "render": function (data, type, full) {
                    return data;
                }
            },
            {
                "targets": [6],
                "data": "realStartTime",
                "render": function (data, type, full) {
                  if(data!==null){
                    var rST 
                    rST = data.replace(/T/g,' ');
                     return rST;
                  }else{
                  var Stips = "尚未开课"                    
                    return Stips;
                  }
                  
                   
                }
            },
            {
                "targets": [7],
                "data": "realEndTime",
                "render": function (data, type, full) {
                  if(data!==null){
                    var rET 
                    rET = data.replace(/T/g,' ');
                    return rET;
                  }else{
                  var Etips = "尚未结课"                    
                    return Etips;
                  }
                    
                }
            },
            {
                "targets": [8],
                "data": "classNo",
               
                "render": function(data, type, row,full) {
                    var s = '<span title="上传" class="handle-btn handle-btn-edit" style="margin-right:14px;"><i class="layui-icon" onclick="uploadVideo('+data+')">&#xe62f;</i></span>';
                    return s;
                },
                "className": "td-handle"
            },             
            {
                "targets": [9],
                "data": "classNo",
               
                "render": function(data, type, row,full) {
                    var s = '<span title="上传" class="handle-btn handle-btn-edit" style="margin-right:14px;"><i class="layui-icon" onclick="uploadRecording('+data+')">&#xe62f;</i></span>';
                    return s;
                },
                "className": "td-handle"
            },            
            {
                "targets": [10],
                "data": "classNo",
                "orderable": false,
                "render": function(data, type, row,full) {
                    var s = '<span title="编辑" class="handle-btn handle-btn-edit" style="margin-right:14px;"><i class="linyer icon-edit" onclick="edit('+data+')";></i></span><span title="删除" class="handle-btn handle-btn-delect"><i class="linyer icon-delect"></i></span>';
                    return s;
                },
                "className": "td-handle"
            }]

        });
        /**
     * flash
     */
    $.fn.dataTable.Buttons.swfPath = "../../src/js/lib/dataTables/extensions/Buttons/swf/flashExport.swf";
    $.fn.dataTable.Buttons.defaults.dom.container.className = 'tableTools-box';
    /**操作栏
     * 
     */
    new $.fn.dataTable.Buttons(myTable, {
      buttons: [{
        "extend": "colvis",
        "text": "<i class='linyer icon-search'></i> <span class='hidden'>显示/隐藏列</span>",
        "className": "layui-btn table-tool",
        columns: ':not(:first):not(:last)'
      }, {
        "extend": "copy",
        "text": "<i class='linyer icon-copy'></i> <span class='hidden'>复制到剪贴板</span>",
        "className": "layui-btn table-tool"
      }, {
        "extend": "csv",
        "text": "<i class='linyer icon-exports'></i> <span class='hidden'>导出csv</span>",
        "className": "layui-btn table-tool"
      }, {
        "extend": "excel",
        "text": "<i class='linyer icon-excel'></i> <span class='hidden'>导出excel</span>",
        "className": "layui-btn table-tool"
      }, {
        "extend": "pdf",
        "text": "<i class='linyer icon-pdf'></i> <span class=''>导出pdf</span>",
        "className": "layui-btn table-tool"
      }, {
        "extend": "print",
        "text": "<i class='linyer icon-print'></i> <span class='hidden'>打印</span>",
        "className": "layui-btn table-tool",
        autoPrint: false,
        message: 'AreTalk课程表!'
      }]
    });
    /*console.log(myTable);*/
    myTable.buttons().container().appendTo($('.tableTools'));
    /**
     * 显示隐藏列
     */
    var defaultColvisAction = myTable.button(0).action();
    myTable.button(0).action(function(e, dt, button, config) {
      defaultColvisAction(e, dt, button, config);
      if($('.dt-button-collection > .dropdown-menu').length == 0) {
        $('.dt-button-collection')
          .wrapInner('<ul class="dropdown-menu" />')
          .find('a').attr('href', 'javascript:;').wrap("<li />")
      }
      $('.dt-button-collection').appendTo('.tableTools-box')
    });
    /**
     * 复制到剪贴板
     */
    var defaultCopyAction = myTable.button(1).action();
    myTable.button(1).action(function(e, dt, button, config) {
      defaultCopyAction(e, dt, button, config);
    });
    /**
     * 选择
     */
    myTable.on('select', function(e, dt, type, index) {
      
      if(type === 'row') {
        $(myTable.row(index).node()).find('input:checkbox').prop('checked', true);
      }
    });
    /**
     * 取消选择
     */
    myTable.on('deselect', function(e, dt, type, index) {
      if(type === 'row') {
        $(myTable.row(index).node()).find('input:checkbox').prop('checked', false);
      }
    });
    /**
     * 根据表头复选框 选择/取消选择所有行
     */
    $(document).on('click', '#productTable > thead > tr > th input[type=checkbox],#productTable > tfoot > tr > th input[type=checkbox]', function() {
      var th_checked = this.checked;
      $('#productTable').find('tbody > tr').each(function() {
        var row = this;
        if(th_checked) myTable.row(row).select();
        else myTable.row(row).deselect();
      });
    });
    /**
     * 选中/取消选中复选框时 选中/取消选中一行
     */
    $(document).on('click', '#productTable tbody td input[type=checkbox]', function() {
      var row = $(this).closest('tr').get(0);
      if(!this.checked) myTable.row(row).deselect();
      else myTable.row(row).select();
    });
    $(document).on('click', '#productTable tbody td', function() {
      var row = $(this).closest('tr').get(0);

      //console.log(row);
    })
  });
  //课程--查看
  $('.btn-showuser').on('click', function() {
    var username = $(this).html();
    var href = 'product-show.html';
    var id = $(this).parents('tr').attr('data-userid');
    console.log(id);
    layer_show(username, href, id, '800', '600');
  });
  /*课程-添加*/
  $('#btn-adduser').on('click', function() {
    var username = "添加课节";
    var href = 'period-add.html';
    layer_show(username, href, '', '800', '600');
  });
  /*课程--停用*/
  $('.table-sort').on('click', '.handle-btn-stop', function() {
    var obj = $(this);
    var id = obj.parents('tr').attr('data-userid');
    layer.confirm('确认要暂停销售吗？', {
      icon: 0,
      title: '警告',
      shade: false
    }, function(index) {
      $(obj).parents("tr").find(".td-handle").prepend('<span class="handle-btn handle-btn-run" title="开始销售"><i class="linyer icon-qiyong"></i></span>');
      $(obj).parents("tr").find(".td-status").html('<span class="label label-default radius">暂停销售</span>');
      $(obj).remove();
      layer.msg('已暂停销售!', {
        icon: 5,
        time: 1000
      });
    });
  });
  /*课程--启用*/
  $('.table-sort').on('click', '.handle-btn-run', function() {
    var obj = $(this);
    var id = obj.parents('tr').attr('data-userid');
    layer.confirm('确认要开始销售吗？', {
      icon: 0,
      title: '警告',
      shade: false
    }, function(index) {
      $(obj).parents("tr").find(".td-handle").prepend('<span class="handle-btn handle-btn-stop" title="暂停销售"><i class="linyer icon-zanting"></i></span>');
      $(obj).parents("tr").find(".td-status").html('<span class="label label-success radius">正常销售</span>');
      $(obj).remove();
      layer.msg('已开始销售!', {
        icon: 6,
        time: 1000
      });
    });
  });

  /*课程-删除*/
  $('.table-sort').on('click', '.handle-btn-delect', function() {
    var obj = $(this);
    var id = obj.parents('tr').attr('data-userid');
    layer.confirm('确认要删除吗？', {
      icon: 0,
      title: '警告',
      shade: false
    }, function(index) {
      $(obj).parents("tr").remove(); //删除方法
      layer.msg('已删除!', {
        icon: 1,
        time: 1000
      });
    });
  });
});