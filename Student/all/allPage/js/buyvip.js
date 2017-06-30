

  $('.VIPTime').click(function(){
    $(this).addClass('active').siblings().removeClass('active');    
  })

var PayType = $("input[name='BuyType']:checked").val();
  

  $('#BuysubmitBtn').click(function(){
        $.ajax({
                type: "GET",
                url: 
                data: {},
                success: function (data) {                        
                      
                        },
                    error: function (a,b,c) {
                        alert('网络超时，请重试');
                         }
                    });     
})
