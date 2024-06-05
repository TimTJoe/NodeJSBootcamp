let url =
  "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}";

let api_id = "c058df98a7892301e6d1697fa71bb019";

let geocoding_api =
  "http://api.openweathermap.org/geo/1.0/direct?q={city name}&appid={API key}";

function getWeather(city) {}

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("form").addEventListener("submit", (e) => {
    let city = document.getElementById("city").value;
    let description = document.getElementById("city");
    let icon = document.getElementById("icon");
    let weather = document.getElementById("weather");

    e.preventDefault();
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${api_id}`
    )
      .then((response) => response.json())
      .then((geocode_data) => {
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${geocode_data[0].lat}&lon=${geocode_data[0].lon}&appid=${api_id}`
        )
          .then((res) => res.json())
          .then((weather_data) => {
            //display data here
            console.log(weather_data)
            weather.innerHTML = weather_data.weather[0].main;
            description.innerHTML = weather_data.weather[0].description;
            icon.innerHTML = weather_data.weather[0].icon;

            console.log(weather_data.weather[0]);
          })
          .catch((weather_error) => console.log(weather_error));
      })
      .catch((error) => console.log("error " + error));
  });
});
