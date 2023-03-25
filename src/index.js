//day and time
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
let date = now.getDate();
let hour = now.getHours();
let min = now.getMinutes();
let todaysDate = document.querySelector("#today");
todaysDate.innerHTML = `${day}, ${month} ${date}`;
let todaysTime = document.querySelector("#time-now");
todaysTime.innerHTML = `${hour}:${min}`;

//Location
function searchCity(event) {
  event.preventDefault();
  let apiKey = "2513f3c728b1b5ff4f4347e1a6af22b8";
  let city = document.querySelector("#location-name").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

//////////////////celcius Fahrenheit Unit Chanage//////////////////////////
let currentTemp = document.querySelector("#current-temp");

function celciusUnitChange(event) {
  event.preventDefault();
  let apiKey = "2513f3c728b1b5ff4f4347e1a6af22b8";
  let city = document.querySelector("#location").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(changeCelcius);
}

function changeCelcius(response) {
  let celciusTemperature = Math.round(response.data.main.temp);
  currentTemp.innerHTML = `${celciusTemperature}`;
}
let celciusUnit = document.querySelector("#celcius-link");
celciusUnit.addEventListener("click", celciusUnitChange);

function fahrenheitUnitChange(event) {
  event.preventDefault();
  let apiKey = "2513f3c728b1b5ff4f4347e1a6af22b8";
  let city = document.querySelector("#location").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(changeFahrenheit);
}

function changeFahrenheit(response) {
  event.preventDefault();
  let farhenheitTemperature = Math.round(response.data.main.temp);
  currentTemp.innerHTML = `${farhenheitTemperature}`;
}
let fahrenheitUnit = document.querySelector("#fahrenheit-link");
fahrenheitUnit.addEventListener("click", fahrenheitUnitChange);
///////////////////////////////////////////////////////////////

// Geolocation
function geoLocate(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findloacation);
}
function findloacation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "3dce9b1c66837262a25b3f448d354a76";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayTemp);
  console.log(position.coords.longitude);
}

function displayTemp(response) {
  let locationName = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let weatherConditions = response.data.weather[0].main;
  let locationHumidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  let rainFall = response.data.rain;

  let h1 = document.querySelector("h1");
  h1.innerHTML = `${locationName}`;

  let todaysTemp = document.querySelector("#current-temp");
  todaysTemp.innerHTML = `${temperature}`;

  let weather = document.querySelector("#descrip-weather");
  weather.innerHTML = `${weatherConditions}`;

  let localHumidity = document.querySelector("#weather-humidity");
  localHumidity.innerHTML = `${locationHumidity} %`;

  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `${wind} mph`;

  let precipitation = document.querySelector("#rain-fall");
  precipitation.innerHTML = `${rainFall}`;
}

let findLocation = document.querySelector("#location-button");
findLocation.addEventListener("click", geoLocate);
