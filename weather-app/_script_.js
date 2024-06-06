let url =
  "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}";

let api_id = "c058df98a7892301e6d1697fa71bb019";

let geocoding_api =
  "http://api.openweathermap.org/geo/1.0/direct?q={city name}&appid={API key}";

let city = document.getElementById("city").value;
let contentDegree = document.getElementById("contentDegree");
let description = document.getElementById("description");
let countryTag = document.getElementById("country");
let icon = document.getElementById("contentIcon");
let wind = document.getElementById("wind");
let pressure = document.getElementById("pressure");
let humidity = document.getElementById("humidity");
let visibility = document.getElementById("visibility");
let rain = document.getElementById("rain");

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("time").innerHTML = Date().slice(16, 21);
  let lat, lon;
  navigator.geolocation.getCurrentPosition((position) => {
    lat = position.coords.latitude;
    lon = position.coords.longitude;

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_id}`
    )
      .then((res) => res.json())
      .then((weather_data) => {
        console.log(weather_data);
        let weather = weather_data.weather;
        let main = weather_data.main;
        let name = weather_data.name;
        countryTag.innerHTML = name + ", " + weather_data.sys.country;

        icon.src = `http://openweathermap.org/img/w/${weather[0].icon}.png`;
        description.innerHTML = weather[0].description;
        contentDegree.innerHTML =
          Math.trunc(((main.temp - 273.15) * 9) / 5 + 32 + 32) +
          "<sup>&deg;F</sup>";
        pressure.innerHTML = Math.trunc(main.pressure * 0.0009869233) + "atm";
        humidity.innerHTML = main.humidity + "%";
        visibility.innerHTML = weather_data.visibility / 1000 + "km";
        wind.innerHTML = weather_data.wind.speed + "Mph";
        rain.innerHTML = weather_data.rain["1h"] + "mm";
      })
      .catch((error) => console.log(error));
  });
});

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city},LR,&appid=${api_id}`
  )
    .then((response) => response.json())
    .then((geocode_data) => {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${geocode_data[0].lat}&lon=${geocode_data[0].lon}&appid=${api_id}`
      )
        .then((res) => res.json())
        .then((weather_data) => {
          let weather = weather_data.weather;
          let main = weather_data.main;
          let name = weather_data.name;
          countryTag.innerHTML = geocode_data[0].state + ", " + name;

          icon.src = `http://openweathermap.org/img/w/${weather[0].icon}.png`;
          description.innerHTML = weather[0].description;
          contentDegree.innerHTML =
            Math.trunc(((main.temp - 273.15) * 9) / 5 + 32 + 32) +
            "<sup>&deg;F</sup>";
          pressure.innerHTML = Math.trunc(main.pressure * 0.0009869233) + "atm";
          humidity.innerHTML = main.humidity + "%";
          visibility.innerHTML = weather_data.visibility / 1000 + "km";
          wind.innerHTML = weather_data.wind.speed + "Mph";
          rain.innerHTML = weather_data.rain["1h"] + "mm";
        })
        .catch((weather_error) => console.log(weather_error));
    })
    .catch((error) => console.log("error " + error));
});
