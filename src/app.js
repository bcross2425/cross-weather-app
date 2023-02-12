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
let currentDay = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let currentDate = `${currentDay} ${hours}:${minutes}`;
let p = document.querySelector("p.date");
p.innerHTML = currentDate;

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let wind = response.data.wind.speed;
  let humidity = response.data.main.humidity;
  let currentCity = response.data.name;
  let weather = response.data.weather[0].description;
  let heading = document.querySelector("h1");
  heading.innerHTML = currentCity;
  let windy = document.querySelector("#wind");
  windy.innerHTML = `${wind}`;
  let humid = document.querySelector("#humidity");
  humid.innerHTML = `${humidity}`;
  let currentTemp = document.querySelector("#temp");
  currentTemp.innerHTML = temperature;
  let description = document.querySelector("p.temp-sky");
  description.innerHTML = weather.toUpperCase();
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?`;
  let apiKey = `57821c3b75b60c68ecd1a8d0dd1aa8d3`;
  let apiUrl = `${apiEndpoint}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", getCurrentPosition);

function citySearch(city) {
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?q=`;
  let apiKey = `57821c3b75b60c68ecd1a8d0dd1aa8d3`;
  let apiUrl = `${apiEndpoint}${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function submitForm(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city");
  citySearch(cityInput.value);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", submitForm);
citySearch("Los Angeles");
