const express = require('express');
const router = express.Router();
const request = require('request');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', {weather: null, error: null});
});

router.post('/',function(req, res,next){
  console.log(req.body.city);
  

  var city = req.body.city;
  var apiKey = "abd9b69097e63d76a963497644ad404e";
  var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

  request(url, function (err, response, body) {
  if(err){
    res.render('index', {weather: null, error: 'Error, please try again'});
  } else {
	 
      var weather = JSON.parse(body);
      if(weather.main == undefined){
	console.log(weather.main);
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
	
       var weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
  

});

module.exports = router;
