$(document).ready(function(){
  console.log("ready");
  var apiKey = "&APPID=e3233dd6e8093f4c47f65aa0d4bc2d06";
  clearData();
  writeTableTitle();

  $("#weather-clear").click(function(){
    clearData();
    writeTableTitle();
  });

  $("#weather-forecast").click(function(){
    console.log("GetForecast");
    var cityname = $("#cityname").val();
    var apiBaseUrl = "http://api.openweathermap.org/data/2.5/forecast/city?q=";
    var sendUrl = apiBaseUrl + cityname + apiKey;
    console.log(sendUrl);
    $.ajax({
      url: sendUrl
    }).done(function(data){
      console.log(data);
      var country = data.city.country;
      var city = data.city.name;
      for(var i = 0; i < data.list.length; i++){
        var info = parseData(data.list[i]);
        info["country"] = country;
        info["city"] = city;
        dataWrite(info);
      }
    }).fail(function(data){
      console.log("error");
    }).always(function(data){
      console.log("quit");
    });
  });

  $("#weather-current").click(function(){
    var cityname = $("#cityname").val();
    var apiBaseUrl = "http://api.openweathermap.org/data/2.5/weather?q=";
    var sendUrl = apiBaseUrl + cityname + apiKey;
    console.log(sendUrl);
    $.ajax({
      url: sendUrl
    }).done(function(data){
      console.log(data);
      var date = new Date(data.dt * 1000);
      console.log(date);
      var country = data.sys.country;
      var city = data.name;
      var info = parseData(data);
      info["country"] = country;
      info["city"] = city;
      dataWrite(info);
    }).fail(function(data){
      console.log("error");
    }).always(function(data){
      console.log("quit");
    });
  });
});

function parseData(data){
  var date = new Date(data.dt * 1000);
  console.log(date);
  var dateStr = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
  var time = date.getHours() + ":" + date.getMinutes();
  var temp_k = data.main.temp;
  var temp_c = round(temp_k - 273.15, 2);
  var humidity = data.main.humidity;
  var weather = (data.weather[0]).main;
  var info = {"date": dateStr, "time": time, "temp": temp_c, "humidity": humidity, "weather":weather};
  return info;
}



function clearData(){
  $("#data").html("");
  $("#cityname").val("");
}

function round(data, digit){
  shift = Math.pow(10,digit);
  data = Math.round(data * shift)/shift;
  return data;
}

function writeTableTitle(){
  var html = $("#data").html();
  html +="<tr><th>Date</th>"
  html +="<th>Time</th>";
  html +="<th>City</th>";
  html +="<th>Temp</th>";
  html +="<th>Weather</th></tr>";
  $("#data").html(html);
}

function dataWrite(data){
  console.log(data);
  var html = $("#data").html();
  console.log(html);
  html += "<tr>";
  html += "<td>";
  html += data["date"];
  html += "</td>";
  html += "<td>";
  html += data["time"];
  html += "</td>";
  html += "<td>";
  html += data["city"];
  html += "</td>";
  html += "<td>";
  html += data["temp"];
  html += "</td>";
  html += "<td>";
  html += data["weather"];
  html += "</td>";
  html += "</tr>";

  $("#data").html(html);
}
