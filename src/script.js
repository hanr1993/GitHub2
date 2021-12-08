function displayDateTime() {
  let now = new Date();
  let date = now.getDate();
  let year = now.getFullYear();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay(3)];
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
  let month = months[now.getMonth(10)];
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${day}, ${date} ${month}, ${year}`;
}

displayDateTime();

function searchCity(event) {
  event.preventDefault();
  let apiKey = "e163a366c5f378959c62d92129e929b6";
  let city = document.querySelector("#valueDisplay").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentTemperature);
}

let citySearch = document.querySelector("#city-search");
citySearch.addEventListener("submit", searchCity);

function showCurrentTemperature(response) {
  console.log(response.data);
  document.querySelector("h2").innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#main-temp");
  let tempEmoji;
  if (temperature < 5) {
    tempEmoji = "🥶";
  } else {
    tempEmoji = "😎";
  }
  temperatureElement.innerHTML = `${temperature}℃ ${tempEmoji}`;
}

function showLocation(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "e163a366c5f378959c62d92129e929b6";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCurrentTemperature);
}

function currentLocation(event) {
  navigator.geolocation.getCurrentPosition(showLocation);
}

let current = document.getElementById("current-button");
current.addEventListener("click", currentLocation);
