$(document).ready(function () {
  const coins = ['ETH','BTC','LTC'];
  const checkboxes = document.querySelectorAll(".checkbox");
  let curVal = document.querySelector("#currency").value;

  var printDataForCoin = function(coin, isPercent) {
    curVal = document.querySelector("#currency").value;
    $.ajax({
      url: 'https://apiv2.bitcoinaverage.com/indices/global/ticker/' + coin + curVal,
      dataType: 'json',
      success: function (data) {
        const card = document.querySelector(`.exchange__card-${coin.toLowerCase()}`);

        const price = card.querySelector(".price__value"),
              hourChange = card.querySelector(".hourChange"),
              dayChange = card.querySelector(".dayChange"),
              weekChange = card.querySelector(".weekChange"),
              monthChange = card.querySelector(".monthChange");

        let viewType;
        let specialChar; 

        price.innerHTML = (data.ask).toFixed(2);

        if(isPercent){
          viewType = "percent";
          specialChar = " %";
        }else{
          viewType = "price";
          specialChar = "";
        }
        
        insertData(hourChange, data.changes[viewType].hour, specialChar);
        insertData(dayChange, data.changes[viewType].day, specialChar);
        insertData(weekChange, data.changes[viewType].week, specialChar);
        insertData(monthChange, data.changes[viewType].month, specialChar);
      },
      error: function (jqXHR, exception) {
        console.log(exception);
      }
    });
  };

  function insertData(element, data, specialChar){
    if(parseInt(data)<=0){
      element.style.color = "red";
    }else{
      element.style.color = "#70c446";
    }
    element.innerHTML = data + specialChar;
  }

  checkboxes.forEach(function(checkbox){
    checkbox.addEventListener("change", function(e){
       printDataForCoin(e.target.dataset.coin, e.target.checked);
    })
  })

  coins.forEach(function(coin){
     printDataForCoin(coin, document.querySelector(`#checkbox-${coin.toLowerCase()}`).checked);
  })

  document.querySelector("#currency").addEventListener("change", function(){
    coins.forEach(function(coin){
       printDataForCoin(coin, document.querySelector(`#checkbox-${coin.toLowerCase()}`).checked);
    })
  })

});