const express = require("express");
const https = require("https");

const app = express();

app.get("/", function(req, res){

    const query = "london";
    const apiKey = "03fe1538c61eb075c2b0eaa4404056ad";
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?appid="+ apiKey +"&q=" + query + "&units="+ unit ;
    
    https.get(url, function(response){
        console.log(response.statusCode);
        //console.log(response.headers);

        response.on("data", function(data){
            //console.log(data); - gives data in hexadecimal
            const weatherData = JSON.parse(data); //converts hex into string json
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write("<p>The weather is currently " + desc + "</p>");
            res.write("<h1>Tempture in London is " + temp + " degrees celcius</h1>");
            res.write("<img src = " + iconURL +" >");
            res.send();
        });
    });
});

app.listen("3000", function(){
    console.log("Server is running on port 3000");
});