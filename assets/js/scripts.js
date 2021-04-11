const api="b94db98390be2c75a7a4da963d43370b";
const unit="metric"
//const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+api+"&units="+unit;
const url="https://api.openweathermap.org/data/2.5/weather?q=mazatlan"+"&appid="+api+"&units="+unit;
// var citySearch=$('.city-search').text()

$(".city-button").click(function(){
    var str = $(".city-search").val();
    // alert(str);
    getForecast(str)
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
        $('.city-name').text(city)
        
        //Getting UV with coordinates
        fetch("https://api.openweathermap.org/data/2.5/uvi?lat="+data.coord.lat+"&lon="+data.coord.lon+"&appid="+api)
        .then(function (uvResponse) {
        return uvResponse.json();
        })
        .then(function (uvData) {
        $('.uv').text('UV Index: '+uvData.value) 
        });

    //     for(var i=0;i<data.length;i++){
    //     // TODO: Loop through the data and generate your HTML
    //     var userName=document.createElement('h3')
    //     var userLink=document.createElement('p')
    //     userName.textContent= data[i].login
    //     userLink.textContent= data[i].html_url
    //     userLink.setAttribute('href',userLink.innerHTML)
    //     userContainer.append(userName)
    //     userContainer.append(userLink)
        
    //   }
        });
    }

    