/*menu.js*/



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


var Sessionid = getCookie("JSESSIONID");




$(document).ready(function(){

/*	$.ajax({
        asycn:false,
        type: "POST",
        url: 'http://211.159.152.210:8188/AreTalkServer/Web/Api/getCommonTable.action;jsessionid='+Sessionid,
        data: {},
        success: function (data) { 
       
                for (var i = 0; i<data.data.lang.length;i++){

                    var langname = data.data.lang[i].name; 
                    var Langid = data.data.lang[i].id; 
                    var LangLi1 ='<li><a href="SmallClasses.html?LangId='+Langid+'">'+langname+'</a></li>'
                    var LangLi2 ='<li><a href="1to1.html?LangId='+Langid+'">'+langname+'</a></li>'
                    var script = '<script>$( "li a.menu1" ).click(function(){$( "ul.cl-effect-2" ).slideToggle( 300, function() {});});</script>'
                    var script2 = '<script>$("li a.menu").click(function(){$("ul.cl-effect-1").slideToggle(300,function(){})});</script>'
               
                    $("#smallclass-menu").append(LangLi1);
					          $("#1to1-menu").append(LangLi2); 
                }

               		$("#smallclass-menu").append(script);
               		$("#1to1-menu").append(script2);

          
        },
        error: function () {
              alert("登陆超时，请重新登陆");
                  parent.location.href="../html/index.html";
                 }
        });

*/


	
})