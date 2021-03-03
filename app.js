var apiKey = 'cf70f780041c353790985d43887bbe4d';

var temp_current = $('#temp_current');
var temp_real = $('#temp_real'); 
var temp_low = $('#temp_low');
var temp_high = $('#temp_high');
var conditions_current = $('#conditions_current');
var conditions_forecast = $('#conditions_forecast');
var wind = $('#wind');
var city_name = $('#city_name');

var city_search = $('#city_search')
var temp_search = $('#temp_search')

function titleCase(string){
    var sentence = string.toLowerCase().split(" ");
    for (var i = 0; i < sentence.length; i++) {
        sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
    }
    return sentence.join(" ");
}

$('#weather_form').on('submit', function(e){
    e.preventDefault();
    if (city_search.val() && temp_search.val()) {
        
        var units;
        var windUnit;
        var tempSymbol;

        if (temp_search.val() == 'kelvin') {
            units = 'standard';
            tempSymbol = 'K';
            windUnit = 'kph';
        } else if(temp_search.val() == 'celcius') {
            units = 'metric';
            tempSymbol = '&deg;';
            windUnit = 'kph';
        } else if(temp_search.val() == 'fahrenheit') {
            units = 'imperial';
            tempSymbol = '&deg;';
            windUnit = 'mph';
        }

        var api = `https://api.openweathermap.org/data/2.5/weather?q=${city_search.val()},us&units=${units}&appid=${apiKey}`;
        console.log(api)
        $.get(api, function(res){
            city_name.text(res.name);
            
            temp_current.html(`${Math.round(res.main.temp)}${tempSymbol}`);
            temp_real.html(`${Math.round(res.main.feels_like)}${tempSymbol}`);
            temp_low.html(`${Math.round(res.main.temp_min)}${tempSymbol}`);
            temp_high.html(`${Math.round(res.main.temp_max)}${tempSymbol}`);
            if (res.weather[0].main === 'Clouds' ) {
                conditions_current.html(`${res.weather[0].main} <span style="font-size: 12px;">@</span> ${res.clouds.all}%`)
            } else {
                conditions_current.html(res.weather[0].main);
            }
            conditions_forecast.html(titleCase(res.weather[0].description));
            wind.html(titleCase(`${res.wind.speed}${windUnit}`));

            city_search.val('')
            temp_search.val('')
        })
   
    } else {
        alert('You must choose a city and selecte a temperature unit.')
    }
});
