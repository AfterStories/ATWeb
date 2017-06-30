$(document).ready(function(){

     /*   登陆按钮等弹出框初始化*/
/*    $('.popup-with-zoom-anim').magnificPopup({
        type: 'inline',
        fixedContentPos: false,
        fixedBgPos: true,
        overflowY: 'auto',
        closeBtnInside: true,
        preloader: false,
        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-zoom-in'
    });
*/


/*    var hasLogin = getCookie("IfLogin");
    
    if (hasLogin){
        $("#rightbox").hide(); 
        $("#Logined").show();
        $("#StudentName").text(getCookie("IfLogin"));
    }else{
        
        alert("Please Sign In");       
        $("#SignIn_BTN").click(); 
        $("#rightbox").show(); 
        $("#Logined").hide();

    }
*/

});


var LoginURL = "http://211.159.152.210:8188/AreTalkServer/Web/Login/";

var TheuserName,Thepassword;

function Login() {
    
        var userName = $("#username").val();
        TheuserName = userName;
        var password = hex_md5($("#Password").val());
        Thepassword = password;
    
    if (!userName || !password) {
            alert('请输入您的用户名与密码。');
            return false;
        }else{

                $.ajax({
                    type: "GET",
                    url: LoginURL+"login.action?userName="+userName+"&password="+password+"&userType=1",
                    data: {},
                    success: function (data) {                        
                    CreateCookie(TheuserName, Thepassword, 30);
                    CreateCookie("IfLogin",TheuserName, 30);
                    CreateCookie("JSESSIONID", data.data.JSESSIONID, 30);
    
                    if(data.data.status=="success"){
                        
                        $("#rightbox").hide(); 
                        $("#Logined").show();
                        $("#StudentName").text(TheuserName);
                        $(".mfp-close").click();
                        alert("登陆成功");
                       location.replace(location.href);
                   
                        var isLogin = true; 
                    }else{
                           alert("用户名或密码错误，请重试");
                         }                        
                      
                        },
                    error: function (a,b,c) {
                       alert("网络超时，请重试");
                         }
                    });

            } 


}



function getSessionId(){  
    var c_name = 'JSESSIONID';  
    if(document.cookie.length>0){  
       c_start=document.cookie.indexOf(c_name + "=")  
       if(c_start!=-1){   
         c_start=c_start + c_name.length+1   
         c_end=document.cookie.indexOf(";",c_start)  
         if(c_end==-1) c_end=document.cookie.length  
         return unescape(document.cookie.substring(c_start,c_end));  
       }  
    }  
} 


function CreateCookie(name, value, days) {
    if (days) {
        var date = new Date;
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1E3);
        var expires = "; expires=" + date.toGMTString()
    } else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/"

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


        
