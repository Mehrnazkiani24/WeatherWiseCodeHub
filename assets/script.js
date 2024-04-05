var searchbutton=document.getElementById("getforcast")
var cityname=document.getElementById("cityname")
var apikey="2c90b12da2a135c1da3ad26676de62ba"
searchbutton.addEventListener("click",function(event){
    event.preventDefault()
    var city = cityname.value
    console.log(city)
    getforcast(city)
})

function getforcast(city){
    var url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=imperial`
    console.log(url)
    fetch(url)
    .then(apiResponse => apiResponse.json())
    .then(result =>{
        console.log(result)
    })
}

