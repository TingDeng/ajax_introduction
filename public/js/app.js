//var weatherData = {};//have to be outside of function
$(document).ready(function(){
  var baseUrl = 'https://api.forecast.io/forecast/';//make sure this address conrrect for 404 because some websites change their api url
  //var weatherData= null;
  var name ="Your Name";
  //$('#get-weather').on('click', getWeather);
  $('#get-weather').on('click',showInfo);


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
    //weatherData = data;
    $('#output').text(JSON.stringify(data));
    console.log(data);
  }

  function errorHandler(err){
    console.log(err);
  }
  function showInfo(){
    var lat=$('#latitude').val();
    var lon=$('#longitude').val();
    var ajaxOption = {
      url: buildUrl(lat,lon),
      dataType: 'jsonp',
      success:showInfoSuccess,
      error: errorHandler
    };
    $.ajax(ajaxOption);
  }
  function showInfoSuccess(data){
    console.log(data);//data is an object contains latitude...
    var source =$('#info').html();
    var template =Handlebars.compile(source);
    var extracteddata ={
      latitude: data.latitude,
      longitude:data.longitude,
      icon:data.currently.icon ||"clear-night",
      summary:data.currently.summary,
      time:moment(data.currently.time).format('MMMM Do YYYY, h:mm:ss a')
    };
    //data is from server
    var html = template(extracteddata);
    $('#test-output').html(html);
  }
});
