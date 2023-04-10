var searchFormEl = document.querySelector('#search-form')
var historyEl = document.querySelector('#history')
var cityEL = document.querySelector('#city')
var currentPicEl = document.querySelector('#current-pic')
var currentTemp = document.querySelector('#temp')
var currentWind = document.querySelector('#wind')
var currentHummidity = document.querySelector('#hummidity')
let foreCastConEl=document.querySelector("#forecast-container")
let searchHistory = JSON.parse(localStorage.getItem('search-input'))
let historyCon=document.querySelector("#history")
let searchInput=document.querySelector('#search-input')
let currentCity = document.querySelector('#city')


let currentDate = new Date()
let dateString = currentDate.toLocaleDateString()

// load history
function loadHistory(){
for(let key of Object.keys(searchHistory)){
  addHisBtn(key)
}
}

// loadHistory()


function addHisBtn(key){
 
  const buttonEl=document.createElement("button")
  buttonEl.innerHTML=key
  buttonEl.className="searchInput"
  buttonEl.addEventListener("click",function(){
    searchInput.value=key
    
  })
  historyCon.appendChild(buttonEl)

}



const APIKey = '68a01bedfe0281ebdf08d0137195550e'

function searchWeather(cityName) {

  ///fetch today weather  data
  let locQueryUrl =
    'https://api.openweathermap.org/data/2.5/weather?q=' +
    cityName +
    '&appid=' +
    APIKey+"&units=imperial"
  fetch(locQueryUrl)
    .then((res) => res.json())
    .then((data) => {
      
      currentCity.innerHTML= data.name +" "+ dateString
      currentTemp.innerHTML="Temperature: "+data.main.temp
      currentHummidity.innerHTML="Humidity: "+data.main.humidity
      currentWind.innerHTML="Wind: "+data.wind.speed
        let iconLink
        if(data.weather){
           iconLink="https://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png"
           currentPicEl.src=iconLink
        }else{
          iconLink="https://openweathermap.org/img/wn/@2x.png"
        }

    })
    .catch((e) => console.error(e))

    ///fetch forecast data
    let locQueryUrl2 =
    'https://api.openweathermap.org/data/2.5/forecast?q=' +
    cityName +
    '&appid=' +
    APIKey+"&units=imperial"
  fetch(locQueryUrl2)
    .then((res) => res.json())
    .then((data) => {
    
      let days=data.list.filter(item=>item.dt_txt.includes("12:00:00"))
      
      

      /*
       <div class="card" id="current">
              <div class="card-body">
                <h2 class="card-title" id="city1"></h2>
                <img class="card-image" id="current-pic1" />
                <p class="card-text" id="temp1">Temp:</p>
                <p class="card-text" id="wind1">Wind:</p>
                <p class="card-text" id="hummidity1">Humidity:</p>
              </div>
            </div>
      
      */
      for(let day of days){
           
           foreCastConEl.appendChild(generateCard(day))
      }


    })
    .catch((e) => console.error(e))


    addHisBtn(cityName)
    localStorage.setItem("search-input", JSON.stringify({...searchHistory,[cityName]:true}) )

} 

function generateCard(day){
  // const currentDate = new Date(response.data.dt * 1000);
  // const day = currentDate.getDate();
  // const month = currentDate.getMonth() + 1;
  // const year = currentDate.getFullYear();
  ///create the elements
  
  const cardEl=document.createElement("div")
  const cardBody=document.createElement("div")
  const h2=document.createElement("h2")
  const imgEl=document.createElement("img")
  const p1=document.createElement("p")
  const p2=document.createElement("p")
  const p3=document.createElement("p")

    
  //filling the content of the card
  let iconLink
  if(day.weather){
     iconLink="https://openweathermap.org/img/wn/"+day.weather[0].icon+"@2x.png"
     imgEl.src=iconLink
  }else{
    iconLink="https://openweathermap.org/img/wn/@2x.png"
  }   
   h2.innerHTML = dateString       
   p1.innerHTML="Temperature: "+day.main.temp
   p2.innerHTML="Wind: "+day.wind.speed
   p3.innerHTML="Humidity: "+day.main.humidity

   cardBody.appendChild(h2)
   cardBody.appendChild(imgEl)
   cardBody.appendChild(p1)
   cardBody.appendChild(p2)
   cardBody.appendChild(p3)
   cardEl.appendChild(cardBody)
   cardEl.className="card"
   return cardEl

}

function handleSearchFormSubmit(event) {
  event.preventDefault()

  var cityName = searchInput.value

  if (!cityName) {
    console.error('You need to enter a city!')
    return
  }
  foreCastConEl.innerHTML = ""
  searchWeather(cityName)
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit)
