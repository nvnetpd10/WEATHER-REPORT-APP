const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true})); //necessary code
app.get("/" , function(req, res){
  res.sendFile(__dirname + "/index.html");
});
app.post("/" , function(req , res){
  console.log(req.body.cityName);
  const url =  "https://api.openweathermap.org/data/2.5/weather?q=gwalior,india&appid=40b8bc68666c0a61c3029faecb01f699&units=metric";
  https.get(url, function(response) {
    console.log(response.statusCode);
    response.on("data" , function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp; // temperature
      const weatherDescription = weatherData.weather[0].description;
      const icon =  weatherData.weather[0].icon;
      const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p>the weather is currently" + weatherDescription + "<p>");
    res.write("<h1>temperature" + temp + "degree celcius</h1>");
    res.write("<img src=" + imageURL + ">");
    res.send();
})
  })
})




app.listen(3000, function() {
  console.log("running");
})
