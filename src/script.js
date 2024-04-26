function refreshWeather(response) {
  let tempElement = document.querySelector("#temp-val");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let iconElement = document.querySelector("#icon");
  let humidityElement = document.querySelector("#humidity");
  let descriptionElement = document.querySelector("#description");
  let windElement = document.querySelector("#wind-speed");
  let dateElement = document.querySelector("#date");
  let currentDate = new Date(response.data.time * 1000);

  //console.log(response);

  cityElement.innerHTML = response.data.city;
  tempElement.innerHTML = Math.round(temperature);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon"/> `;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  descriptionElement.innerHTML = response.data.condition.description;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  dateElement.innerHTML = getDate(currentDate);

  getForecast(response.data.city);
}

function getDate(currentDate) {
  let minutes = currentDate.getMinutes();
  let hours = currentDate.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[currentDate.getDay()];

  if (minutes < 10) {
    minutes = `0{minutes}`;
  }

  return `${day} ${hours}: ${minutes}`;
}

function searchCity(city) {
  //make an api call and update interface
  //separation of concern
  let apiKey = "34e98tf5a314f6064460deda24ofb831";
  apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function submitCity(event) {
  event.preventDefault();
  let userInput = document.querySelector("#search-form-input");
  //console.log(userInput.value);
  searchCity(userInput.value);
  //displaying the city user input as h1 with id="city"
}

function getForecast(city) {
  let apiKey = "34e98tf5a314f6064460deda24ofb831";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function displayForecast(response) {
  console.log(response);

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 6) {
      forecastHtml += `
        <div class="weather-forecast-day">
                    <div class="weather-forecast-date">${formatForecastDay(
                      day.time
                    )}</div>
                    <div>
                      <img class="weather-forecast-icon"src="${
                        day.condition.icon_url
                      }" class="weather-forecast-icon"/>
                    </div>
                    <div class="weather-forecast-temp">
                    <div class="weather-forecast-temp">
                        <strong>${Math.round(day.temperature.maximum)}</strong>
                    </div>
                    <div class="weather-forecast-temp">${Math.round(
                      day.temperature.minimum
                    )}</div>
                    </div>
                </div>
`;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
//console.log(searchFormElement);

//whenever form submitted a search is handled
searchFormElement.addEventListener("submit", submitCity);

searchCity("Durban");

displayForecast();
