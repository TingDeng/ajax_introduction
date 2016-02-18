var weatherData = {};//have to be outside of function
$(document).ready(function(){
  var baseUrl = 'https://api.forecast.io/forecast/';//make sure this address conrrect for 404 because some websites change their api url
  //var weatherData= null;
  var name ="Your Name";
  $('#get-weather').on('click', getWeather);



  function buildUrl(lat, lon){
    //return "https://api.forecast.io/forecast/19874b9bcff8e37547fb8550e260db96/37.8267,-122.423";
    return baseUrl + apiKey+'/'+lat+','+lon;
  }

  function getWeather(){
    var lat = $('#latitude').val();
    var lon = $('#longitude').val();
    var options = {
      url: buildUrl(lat, lon),
      dataType: 'jsonp',
      success: successHandler,
      error: errorHandler
    };

    $.ajax(options);
  }


  function successHandler(data){
    weatherData = data;
    $('#output').text(JSON.stringify(data));
    console.log(data);
  }

  function errorHandler(err){
    console.log(err);
  }
});
