// Function to update the weather information displayed on the page
function refreshWeather(response) {
  // Selecting elements on the page to update with weather data
  let tempElement = document.querySelector("#temp-val");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let iconElement = document.querySelector("#icon");
  let humidityElement = document.querySelector("#humidity");
  let descriptionElement = document.querySelector("#description");
  let windElement = document.querySelector("#wind-speed");
  let dateElement = document.querySelector("#date");
  let currentDate = new Date(response.data.time * 1000);

  // Updating elements with weather data
  cityElement.innerHTML = `${response.data.city}, ${response.data.country} `;
  tempElement.innerHTML = Math.round(temperature);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon"/> `;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  descriptionElement.innerHTML = response.data.condition.description;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  dateElement.innerHTML = getDate(currentDate);

  // Calling a function to fetch and display the weather forecast
  getForecast(response.data.city);
}
// Function to format date and time
function getDate(currentDate) {
  // Getting minutes, hours, date, month, and day
  let minutes = currentDate.getMinutes();
  let hours = currentDate.getHours();
  let date = currentDate.getDate();

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

  let month = months[currentDate.getMonth()];

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

  // Formatting minutes if less than 10
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  // Returning formatted date and time
  return `${day}, ${date} ${month}, ${hours}: ${minutes}`;
}

// Function to fetch weather data for a given city
function searchCity(city) {
  // API key and URL for fetching weather data
  let apiKey = "34e98tf5a314f6064460deda24ofb831";
  apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  // Making a GET request using Axios and passing the refreshWeather function as a callback
  axios.get(apiUrl).then(refreshWeather);
}

// Function to handle form submission
function submitCity(event) {
  // Preventing the default form submission behavior
  event.preventDefault();
  // Selecting the input element containing the city name
  let userInput = document.querySelector("#search-form-input");
  // Function to fetch and display the weather forecast
  searchCity(userInput.value);
}

// Function to fetch and display the weather forecast
function getForecast(city) {
  let apiKey = "34e98tf5a314f6064460deda24ofb831";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  //console.log(apiUrl);
  // Making a GET request using Axios and passing the displayForecast function as a callback
  axios.get(apiUrl).then(displayForecast);
}

// Function to format forecast day
function formatForecastDay(timestamp) {
  // Creating a Date object from timestamp
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Returning the formatted day
  return days[date.getDay()];
}
// Function to display the weather forecast
function displayForecast(response) {
  // Initializing empty HTML string to store forecast HTML
  let forecastHtml = "";
  // Looping through each day in the forecast data
  response.data.daily.forEach(function (day, index) {
    // Checking if index is less than 5 to limit the forecast to 5 days
    if (index < 5) {
      // Adding HTML for each forecast day to forecastHtml string
      forecastHtml += `
        <div class="weather-forecast-day">
                    <div class="weather-forecast-date">${formatForecastDay(
                      day.time
                    )}</div>
                    <div>
                      <img style="height: 80px; width: 80px"; class="weather-forecast-icon"src="${
                        day.condition.icon_url
                      }" class="weather-forecast-icon"/>
                    </div>
                    <div class="weather-forecast-temp">
                    <div class="weather-forecast-temp">
                        <strong>${Math.round(
                          day.temperature.maximum
                        )}&deg</strong> 
                    </div>
                    <div class="weather-forecast-temp">${Math.round(
                      day.temperature.minimum
                    )}&deg</div>
                    </div>
                </div>
`;
    }
  });
  // Selecting the forecast element and updating its HTML content with forecastHtml
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}
// Selecting the search form element
let searchFormElement = document.querySelector("#search-form");
// Adding event listener for form submission, calling submitCity function
searchFormElement.addEventListener("submit", submitCity);

// Calling searchCity function with default city (Durban)
searchCity("Durban");
// Calling displayForecast function
displayForecast();
