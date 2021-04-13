//openweathermap.org api id
const api="b94db98390be2c75a7a4da963d43370b";
const unit="metric"
var searchResults=$('.search-results')
var cityOrder=0

//Adding click events to button for searching
$(".city-button").click(function(){
    var str = $(".city-search").val();
    getForecast(str)
    getForecast5Days(str)
});

//Fucntion For Getting City Weather
function getForecast(city){
    
    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+api+"&units="+unit;

    //Asynchronous Get Request For Weather
    fetch(requestUrl)
    .then(function (response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.json();
    })
    .then(function (data) {
    //Filling City Weather Section
    $('.temp').text('Temp: '+data.main.temp+String.fromCharCode(176)+' C')
    $('.wind').text('Wind: '+data.wind.speed+' MPH')
    $('.humidity').text('Humidity: '+data.main.humidity+' %')

    let today=todayDate()
    $('.city-name').text(city+"("+today+")")

    var cityNameButton=document.createElement('button')
    searchResults.append(cityNameButton)
    cityNameButton.setAttribute("id",city)
    cityNameButton.setAttribute("class", "btn btn-primary btn-block")
    cityNameButton.textContent=city

    //Adding Click Events For Each City Name Button Added
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
    var uvText=$('.uvText')        
    var uvNumber=$('.uvNumber')
    uvIndexValue=Math.round(uvData.value)
    
    //Function For Filling 5-Day Cards Section
    formatUvIndex(uvIndexValue,uvText,uvNumber)
    cityOrder++
    
    //Persisnting Data
    localStorage.setItem(cityOrder, city);    

    });                       
    }).catch(function(error) {
        //Managing And Messaging For Errors
        alert("City not found...")
        console.log('Looks like there was a problem: \n', error);
    });

}

//Buttons City Names Event Clicks Function For Filling City Section Weather
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
    let today=todayDate()
    $('.city-name').text(city+"("+today+")")
            
    //Getting UV with coordinates
    fetch("https://api.openweathermap.org/data/2.5/uvi?lat="+data.coord.lat+"&lon="+data.coord.lon+"&appid="+api)
    .then(function (uvResponse) {
    return uvResponse.json();
    })
    .then(function (uvData) {
        
        var uvText=$('.uvText')        
        var uvNumber=$('.uvNumber')
        uvIndexValue=Math.round(uvData.value)

        formatUvIndex(uvIndexValue,uvText,uvNumber)
            
    });

    });

}

//Function For Filling 5-Days Forecast Cards
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
        $('.day-'+`${i + 1}`+'-wind').text('Wind: '+data.list[days[i]].wind.speed+' MPH')
        $('.day-'+`${i + 1}`+'-humidity').text('Humidity: '+data.list[days[i]].main.humidity+' %')                   
    }                 
    });
}

//Buttons City Names Event Clicks Function For Filling 5-Days Forecast Cards
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
            var icon=data.list[days[i]].weather[0].icon;
            var imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";
            $('.weather-image-'+`${i + 1}`).attr("src",imageURL);
            $('.day-'+`${i + 1}`+'-temp').text('Temp: '+data.list[days[i]].main.temp+String.fromCharCode(176)+' C')                    
            $('.day-'+`${i + 1}`+'-wind').text('Wind: '+data.list[days[i]].wind.speed+' MPH')
            $('.day-'+`${i + 1}`+'-humidity').text('Humidity: '+data.list[days[i]].main.humidity+' %')                   
        }                 
    });

}        

//Function For Getting And Showing By Coloring UV Conditions
function formatUvIndex(indexValue,IndexTagText,IndexTagNumber){
    var uvColors=
    [
        [1,2,'Green'],
        [3,5,'Yellow'],
        [6,7,'Orange'],
        [8,10,'Red'],
        [11,30,'Violet']
    ];

    IndexTagText.text('UV Index: ')

    for(i=0;i<uvColors.length;i++){
        if(indexValue>=uvColors[i][0] && indexValue<=uvColors[i][1]){
            IndexTagNumber.text(indexValue) 
            IndexTagNumber.css("background-color", uvColors[i][2])
        }
    }        


}

//Starting Function
function init(){
    if (localStorage.length!=0){

        //Getting Local Storage Key Values Pairs
        let arrayOfKeys = Object.keys(localStorage);
        let arrayOfValues = Object.values(localStorage);
        let localstorage = {};

        //Building An Object From Local Storage Key Values Pairs
        for (var i = 0; i < localStorage.length; i++){
            localstorage[arrayOfKeys[i]] = arrayOfValues[i]
        }

        let citiesNames = [];

        //Building A Multidimentional Array From Local Storage Object
        for (var item in localstorage) {
            citiesNames.push([item, localstorage[item]]);
        }
        
        console.log(citiesNames)

        let numOfCities =citiesNames.length

        //Loop For Filling City Names Button, City Weather And 5-Days Forecast Sections
        for (var i=0; i<numOfCities;i++){ 
            getForecast(citiesNames[i][1])
            getForecast5Days(citiesNames[i][1])
        }    
        
    }
}

//Function For Getting Today's Date
function todayDate(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '/' + dd;
    return today
}

//Starting Application
init()