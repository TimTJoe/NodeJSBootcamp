const API_ID = "c058df98a7892301e6d1697fa71bb019";
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";
const GEOCODING_API_URL = "https://api.openweathermap.org/geo/1.0/direct";
const cityInput = document.getElementById("city");
const contentDegree = document.getElementById("contentDegree");
const description = document.getElementById("description");
const countryTag = document.getElementById("country");
const icon = document.getElementById("contentIcon");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");
const humidity = document.getElementById("humidity");
const visibility = document.getElementById("visibility");
const rain = document.getElementById("rain");
const feelings = document.getElementById("feelings");

document.getElementById("time").innerHTML = new Date().toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
});

// window.addEventListener("load", () => {
  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude: lat, longitude: lon } = position.coords;
    fetchWeatherData(lat, lon);
  });
// });

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  fetchCityCoordinates(cityInput.value);
});

function fetchWeatherData(lat, lon) {
  fetch(`${WEATHER_API_URL}?lat=${lat}&lon=${lon}&appid=${API_ID}`)
    .then((res) => res.json())
    .then(updateWeatherUI)
    .catch(console.error);
}

function fetchCityCoordinates(city) {
  fetch(`${GEOCODING_API_URL}?q=${city}&appid=${API_ID}`)
    .then((res) => res.json())
    .then((geocodeData) => {
      const { lat, lon, state, name } = geocodeData[0];
      countryTag.innerHTML = `${state}, ${name}`;
      fetchWeatherData(lat, lon);
    })
    .catch(console.error);
}

function updateWeatherUI(weatherData) {
  const {
    weather,
    main,
    sys,
    visibility: vis,
    wind: wnd,
    rain: rn,
  } = weatherData;
  countryTag.innerHTML = `${weatherData.name}, ${sys.country}`;
  icon.src = `http://openweathermap.org/img/w/${weather[0].icon}.png`;
  description.innerHTML = weather[0].description;
  contentDegree.innerHTML = `${Math.trunc(
    ((main.temp - 273.15) * 9) / 5 + 32
  )}<sup>&deg;F</sup>`;
  pressure.innerHTML = `${Math.trunc(main.pressure * 0.0009869233)}atm`;
  humidity.innerHTML = `${main.humidity}%`;
  visibility.innerHTML = `${vis / 1000}km`;
  wind.innerHTML = `${wnd.speed}Mph`;
  rain.innerHTML = `${rn ? rn["1h"] : 0}mm`;
  feelings.innerHTML = `Feels Like ${Math.trunc(
    ((main.feels_like - 273.15) * 9) / 5 + 32
  )}&deg;F`;
}
