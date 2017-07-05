

$(document).ready(function(){ 


  $("#header").load("lib/header/header.html",function(){
  

  });

  $("footer").load("lib/footer/footer.html",function(){
    $('.changeLangSet').dropkick({

        change: function (value) {

          $("body").cloudLang({lang: value, file: "lib/js/lang/lang-resource.xml"});
          $("#LanguagePic img").attr("src","images/"+value+".png");
          CreateCookie("Language", value, 30)
        }

      });

  })




$("#next").click(function(){
 window.location.href = "TeacherFinish.html";

})





})//ready结束
