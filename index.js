
function getlat_lon() {
    var search = document.getElementById("search").value
    var url = "http://api.openweathermap.org/geo/1.0/direct?q=" + search + "&limit=1&appid=af2a1bbd8e9db4f05414357adffec524"

    fetch(url)
        .then((response) => {
            return response.json();

        })
        .then((data) => {
            getData(data[0].lat, data[0].lon)
            getMap(search)
        });
}




function getData(lat, lon) {
    var details = document.getElementById("details")

    var url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=af2a1bbd8e9db4f05414357adffec524`
    console.log(url)

    fetch(url)
        .then((response) => {
            return response.json();

        })
        .then((data) => {

            var min_temp = document.createElement("h1")
            var max_temp = document.createElement("h1")
            var wind = document.createElement("h1")
            var cloud = document.createElement("h1")
            var sunrise = document.createElement("h1")
            var sunset = document.createElement("h1")

            min_temp.textContent = `Min Temp : ${data.main.temp_min} °C`
            max_temp.textContent = `Max Temp : ${data.main.temp_max} °C`
            wind.textContent = `Wind speed : ${data.wind.speed} m/s`
            cloud.textContent = `Cloud : ${data.clouds.all}%`
            sunrise.textContent = `Sunrise : ${convertUnixtoTime(data.sys.sunrise)}`
            sunset.textContent = `Sunset : ${convertUnixtoTime(data.sys.sunset)}`

            details.append(min_temp, max_temp, wind, cloud, sunrise, sunset)

        });
}


function convertUnixtoTime(ts) {
    var date = new Date(ts * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime;
}

function getMap(search) {

    var url = `https://www.google.com/maps/embed/v1/place?key=AIzaSyDBxZLxJBSSTqXd5JL77G0CggVHViACdSc&q=${search}`
    console.log(url)
    var mapDiv = document.createElement("iframe")
    mapDiv.src = url
    mapDiv.style = "width:100%; height:100%;"
    var maps = document.getElementById("maps")
    maps.appendChild(mapDiv)
    
}