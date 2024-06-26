var searchbutton = document.getElementById("getforcast")
var cityname = document.getElementById("cityname")
var apikey = "2c90b12da2a135c1da3ad26676de62ba"
var searchHistory = JSON.parse(localStorage.getItem("weatherDashboard")) || []

searchbutton.addEventListener("click", function (event) {
    event.preventDefault()
    var city = cityname.value
    searchHistory.push(city)
    localStorage.setItem("weatherDashboard", JSON.stringify(searchHistory))
    console.log(city)
    getforcast(city)
    Get5dayforcast(city)
    previousSearch()
})

function getforcast(city) {
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=imperial`
    console.log(url)
    fetch(url)
        .then(apiResponse => apiResponse.json())
        .then(result => {
            console.log(result)
            var html = `
            <h3 class="text-center">City ${result.name}</h3>
            <div class="card" style="width: 18rem;">
        <img src="https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png" class="card-img-top" alt="icon">
        <div class="card-body">
          <p class="card-text">Description: ${result.weather[0].description}</p>
          <p class="card-text">Temprature: ${result.main.temp}</p>
          <p class="card-text">Humidity: ${result.main.humidity}</p>
          <p class="card-text">Windspeed: ${result.wind.speed}</p>
       
        </div>
      </div>`
            document.getElementById("currentforecast").innerHTML = html
        })
}

function Get5dayforcast(city) {
    //api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
    var url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}&units=imperial`
    console.log(url)
    fetch(url)
        .then(apiResponse => apiResponse.json())
        .then(result => {
            console.log(result)
            var html = ""
            for (let i = 0; i < result.list.length; i++) {
                html += `<div class="card" style="width: 18rem;">
            <img src="https://openweathermap.org/img/wn/${result.list[i].weather[0].icon}@2x.png" class="card-img-top" alt="icon">
            <div class="card-body">
              <h5 class="card-title"> ${result.list[i].dt_txt}</h5>
              <p class="card-text">Description: ${result.list[i].weather[0].description}</p>
              <p class="card-text">Temprature: ${result.list[i].main.temp}</p>
              <p class="card-text">Humidity: ${result.list[i].main.humidity}</p>
              <p class="card-text">Windspeed: ${result.list[i].wind.speed}</p>
           
            </div>
          </div>`
            }
            document.getElementById("5dayforecast").innerHTML = html
        })
}

function previousSearch() {
    var searchHistory = JSON.parse(localStorage.getItem("weatherDashboard")) || []
    var html =""
    for (let i = 0; i < searchHistory.length;i++){
        html += `<button class="btn btn-secondary search" onClick={searchCity(event)}>${searchHistory[i]}</button>`
    }
    document.getElementById("previoussearch").innerHTML=html
    // var searchlist=document.querySelector(".search")
    // searchlist.addEventListener("click",
    
}
function searchCity(e){
    var city = e.target.textContent
    console.log(city)
    getforcast(city)
    Get5dayforcast(city)
}
previousSearch()