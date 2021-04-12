const api="b94db98390be2c75a7a4da963d43370b";
const unit="metric"
//const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+api+"&units="+unit;
const url="https://api.openweathermap.org/data/2.5/weather?q=mazatlan"+"&appid="+api+"&units="+unit;
var searchResults=$('.search-results')

$(".city-button").click(function(){
    var str = $(".city-search").val();
    getForecast(str)
    getForecast5Days(str)
});

function getForecast(city) {
    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+api+"&units="+unit;
    
    fetch(requestUrl)
        .then(function (response) {
        return response.json();
        })
        .then(function (data) {
        $('.temp').text('Temp: '+data.main.temp+String.fromCharCode(176)+' C')
        $('.wind').text('Wind: '+data.wind.speed+' MPH')
        $('.humidity').text('Humidity: '+data.main.humidity+' %')
        let today = new Date().toISOString().slice(0, 10)
        $('.city-name').text(city+"("+today+")")

        
        var cityNameButton=document.createElement('button')
        searchResults.append(cityNameButton)
        cityNameButton.setAttribute("id",city)
        cityNameButton.setAttribute("class", "btn btn-primary btn-block")
        cityNameButton.textContent=city

        $("#"+city).click(event => {  
            getForecastButtons(event,city);
            getForecastButtons5Days(event,city);
          });

       
        
        //Getting UV with coordinates
        fetch("https://api.openweathermap.org/data/2.5/uvi?lat="+data.coord.lat+"&lon="+data.coord.lon+"&appid="+api)
        .then(function (uvResponse) {
        return uvResponse.json();
        })
        .then(function (uvData) {
        $('.uv').text('UV Index: '+uvData.value) 
        });
        });
    }

function getForecastButtons(event,city) {
    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+api+"&units="+unit;
    
    fetch(requestUrl)
        .then(function (response) {
        return response.json();
        })
        .then(function (data) {
        $('.temp').text('Temp: '+data.main.temp+String.fromCharCode(176)+' C')
        $('.wind').text('Wind: '+data.wind.speed+' MPH')
        $('.humidity').text('Humidity: '+data.main.humidity+' %')
        $('.city-name').text(city)        
        
        //Getting UV with coordinates
        fetch("https://api.openweathermap.org/data/2.5/uvi?lat="+data.coord.lat+"&lon="+data.coord.lon+"&appid="+api)
        .then(function (uvResponse) {
        return uvResponse.json();
        })
        .then(function (uvData) {
        $('.uv').text('UV Index: '+uvData.value) 
        });

        });
    }

    //Pendientes:
    // validar wu no esté vacío el nombre de la ciudad, y si no la encuentra ponga un msj


    function getForecast5Days(city) {
        var requestUrl = "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid="+api+"&units="+unit;
        
        fetch(requestUrl)
            .then(function (response) {
            return response.json();
            })
            .then(function (data) {
                var days=[8,16,24,32,39]
                for(var i=0;i<5;i++){                          
                    $('.day-'+`${i + 1}`+'-header').text(data.list[days[i]].dt_txt.split(' ')[0])
                    var icon=data.list[days[i]].weather[0].icon;
                    var imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";
                    $('.weather-image-'+`${i + 1}`).attr("src",imageURL);
                    $('.day-'+`${i + 1}`+'-temp').text('Temp: '+data.list[days[i]].main.temp+String.fromCharCode(176)+' C')
                    // $('.wind').text('Wind: '+data.wind.speed+' MPH')
                    // $('.humidity').text('Humidity: '+data.main.humidity+' %')
                    // $('.city-name').text(city)
                }                 
            });
        }

    function getForecastButtons5Days(event,city) {
        var requestUrl = "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid="+api+"&units="+unit;
        
        fetch(requestUrl)
            .then(function (response) {
            return response.json();
            })
            .then(function (data) {
                var days=[8,16,24,32,39]
                for(var i=0;i<5;i++){                
                    $('.day-'+`${i + 1}`+'-header').text(data.list[days[i]].dt_txt.split(' ')[0])
                    // var icon=weatherData.weather[0].icon;
                    // var imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";
                    // res.write("<p>The weather is currently: "+ description +"</p>");
                    // res.write("<h1>The temperature in "+query+" is: "+ temp + " Celcius degress.</h1>");
                    // res.write("<img src="+imageURL+">");

                    // $('.wind').text('Wind: '+data.wind.speed+' MPH')
                    // $('.humidity').text('Humidity: '+data.main.humidity+' %')
                    // $('.city-name').text(city)
                }     
            });
        }        