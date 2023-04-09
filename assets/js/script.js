var searchFormEl = document.querySelector('#search-form');
var historyEl = document.querySelector('#history');
var cityEL = document.querySelector('#city');
var currentPicEl = document.querySelector('#current-pic');
var currentTemp = document.querySelector('#temp');
var currentWind = document.querySelector('#wind');
var currentHummidity = document.querySelector('#hummidity');

let searchHistory = JSON.parse(localStorage.getItem("search-input"))

const APIKey = "68a01bedfe0281ebdf08d0137195550e"

function searchWeather(city) {
    let locQueryUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey
    fetch(locQueryUrl).then(res=>res.json()).then(data=>{
      console.log(data)

    }).catch(e=>console.error(e))
   
}

function handleSearchFormSubmit(event) {
  alert("yes")
    event.preventDefault();
  
    var cityName = document.querySelector('#search-input').value;
  
    if (!cityName) {
      console.error('You need to enter a city!');
      return;
    }
  
    searchWeather(cityName);
  }
  
  searchFormEl.addEventListener('submit', handleSearchFormSubmit);
  
  
  