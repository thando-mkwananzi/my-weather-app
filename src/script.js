function searchCity(event) {
  event.preventDefault();
  userInput = document.querySelector("#search-form-input");
  console.log(userInput.value);
  let cityElement = document.querySelector("#city");
  //displaying the city user input as h1 with id="city"
  cityElement.innerHTML = userInput.value;
}

let searchFormElement = document.querySelector("#search-form");
console.log(searchFormElement);

//whenever form submitted a search is handled
searchFormElement.addEventListener("submit", searchCity);
