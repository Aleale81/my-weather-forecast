/** @format */

//Dispay current date and time

function formatDate(date) {
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    let currentDay = days[date.getDay()];
    let currentMonth = months[date.getMonth()];
    let currentDate = date.getDate();
    let currentYear = date.getFullYear();

    let today = `${currentDay}, ${currentMonth} ${currentDate}, ${currentYear}`;
    return today;
}

let currentDate = new Date();
let actualDate = document.querySelector("#date");

console.log(actualDate);
console.log(currentDate);
console.log(formatDate(currentDate));
actualDate.innerHTML = formatDate(currentDate);

function formatTime(date) {
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    let time = `${hours}:${minutes}`;
    return time;
}
let actualTime = document.querySelector("#time");
actualTime.innerHTML = formatTime(currentDate);

//conversion °F-°C

function cToF(celsius) {
    return Math.round((celsius * 9) / 5 + 32);
}

function fToC(fahrenheit) {
    return Math.round(((fahrenheit - 32) * 5) / 9);
}

function switchCtoF(event) {
    event.preventDefault();
    let temperature = document.querySelector("#actualtemperature");
    temperature.innerHTML = 43;
}

function switchFtoC(event) {
    event.preventDefault();
    let temperature = document.querySelector("#actualtemperature");
    temperature.innerHTML = 6;
}
let fahLink = document.querySelector("#fah");
fahLink.addEventListener("click", switchCtoF);

let celLink = document.querySelector("#cel");
celLink.addEventListener("click", switchFtoC);

//week 5 homework

function showTemperaure(response) {
    let actualTemperature = Math.round(response.data.main.temp);
    let temperature = document.querySelector("#actualtemperature");
    temperature.innerHTML = actualTemperature;
}

function changeCity(event) {
    event.preventDefault();
    let city = document.querySelector("#city");
    let typedcity = document.querySelector("#search-city").value;
    city.innerHTML = `${typedcity}`;

    let apiKey = "c0e61b09ce3783df76abc904136f7ab8";
    let unit = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${typedcity}&appid=${apiKey}&units=${unit}`;
    axios.get(apiUrl).then(showTemperaure);
}

//bonus challenge
function showTempLocation(response) {
    console.log(response);
    let actualTemperature = Math.round(response.data.main.temp);
    let temperature = document.querySelector("#actualtemperature");
    temperature.innerHTML = actualTemperature;

    let city = document.querySelector("#city");
    let currentLocation = response.data.name;
    let country = response.data.sys.country;
    city.innerHTML = `${currentLocation} (${country})`;
}

function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let unit = "metric";
    let apiKey = "c0e61b09ce3783df76abc904136f7ab8";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
    axios.get(apiUrl).then(showTempLocation);
}

function getPosition() {
    navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#currentLocation");
button.addEventListener("click", getPosition);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", changeCity);