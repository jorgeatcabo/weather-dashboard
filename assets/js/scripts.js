const api="b94db98390be2c75a7a4da963d43370b";
const unit="metric"
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

        
        // let today = new Date().toISOString().slice(0, 10)
        let today=todayDate()
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
        var uvText=$('.uvText')        
        var uvNumber=$('.uvNumber')
        uvIndexValue=Math.round(uvData.value)

        formatUvIndex(uvIndexValue,uvText,uvNumber)

        localStorage.setItem(city, city);    


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
        let today=todayDate()
        // let today = new Date().toISOString().slice(0, 10)
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

    //Pendientes:
    // validar wu no esté vacío el nombre de la ciudad, y si no la encuentra ponga un msj


    function getForecast5Days(city) {
        var requestUrl = "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid="+api+"&units="+unit;
        
        fetch(requestUrl)
            .then(function (response) {
            return response.json();
            })
            .then(function (data) {
                // var days=[8,16,24,32,39]
                var days=[0,8,16,24,32,39]
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

    function getForecastButtons5Days(event,city) {
        var requestUrl = "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid="+api+"&units="+unit;
        
        fetch(requestUrl)
            .then(function (response) {
            return response.json();
            })
            .then(function (data) {
                //var days=[8,16,24,32,39]
                var days=[0,8,16,24,32,39]
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
    
    function formatUvIndex(indexValue,IndexTagText,IndexTagNumber){
        var uvColors=
        [
            [1,2,'Green'],
            [3,5,'Yellow'],
            [6,7,'Orange'],
            [8,10,'Red'],
            [11,20,'Violet']
        ];

        IndexTagText.text('UV Index: ')

        for(i=0;i<uvColors.length;i++){
            if(indexValue>=uvColors[i][0] && indexValue<=uvColors[i][1]){
                IndexTagNumber.text(indexValue) 
                IndexTagNumber.css("background-color", uvColors[i][2])
            }
        }        


    }

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
    

            let numOfCities =citiesNames.length
    
            //Loop For Filling Text Areas Descriptions From Multidimentional Array
            for (var i=0; i<numOfCities;i++){ 
                getForecast(citiesNames[i][0])
                getForecast5Days(citiesNames[i][0])
                // $('[data-hour="'+ctiesNames[i][0]+'"]').text(ctiesNames[i][1])    
            }    
            
        }
    }

function todayDate(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '/' + dd;
    return today
}
    init()