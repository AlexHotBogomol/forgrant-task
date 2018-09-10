$(document).ready(function () {

  const coin = ['ETH','BTC','LTC'];


  const btc = document.querySelector('.exchange__card-btc');
			  ltc = document.querySelector('.exchange__card-ltc');
			  eth = document.querySelector('.exchange__card-eth');

  const arr = [eth, btc, ltc];

  let curVal = $(".exchange__select").val();

  function insertData(element, data){
  	if(parseInt(data)<=0){
  		element.style.color = "red";
  	}else{
  		element.style.color = "#70c446";
  	}
  	element.innerHTML = data;
  }

  
  var getData = function() {
    for (var i in coin) {
		  (function(i, coin) {
		    $.ajax({
		      url: 'https://apiv2.bitcoinaverage.com/indices/global/ticker/' + coin[i] + curVal,
		      dataType: 'json',
		      success: function (data) {
		        const price = arr[i].querySelector(".price__value"),
		        			hourChange = arr[i].querySelector(".hourChange"),
		        			dayChange = arr[i].querySelector(".dayChange"),
		        			weekChange = arr[i].querySelector(".weekChange"),
		        			monthChange = arr[i].querySelector(".monthChange");

	        	price.innerHTML = (data.ask).toFixed(2);
	        	insertData(hourChange, data.changes.price.hour);
	        	insertData(dayChange, data.changes.price.day);
	        	insertData(weekChange, data.changes.price.week);
	        	insertData(monthChange, data.changes.price.month);
		      },
		      error: function (jqXHR, exception) {
		        console.log(exception);
		      }
		    });
		  })(i, coin);
		}
	};

  getData();

  $(function() {
    $('.exchange__select').change(function() {
      curVal = $(".exchange__select option:selected").val();
     	getData();
    });
  });
});