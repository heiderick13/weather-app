const apiKey = "dd9ec81f2d2672d352f3fbc746477d59";
const countryFlagURL = "https://countryflagsapi.com/png/";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search-btn");
const errorMsg = document.querySelector("#error-msg");

const cityName = document.querySelector("#city-name");
const country = document.querySelector("#country-img");
const temperature = document.querySelector("#temperature span");
const feelsLike = document.querySelector("#feels-like span");
const weatherType = document.querySelector("#type");
const typeIcon = document.querySelector("#img-type");
const humidity = document.querySelector("#humidity span");
const wind = document.querySelector("#wind span");

const dataContainer = document.querySelector("#city-data");

// Functions
async function getWeatherData(city) {
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

  const resp = await fetch(apiURL);
  const data = await resp.json();

  console.log(data);
  return data;
}

async function showWeatherData(city) {
  const data = await getWeatherData(city);

  if (data.cod == "404") {
    errorMsg.style.display = "block";
    dataContainer.classList.add("hide");
  } else {
    let iconId = data.weather[0].icon;
    cityName.textContent = data.name;
    temperature.textContent = parseInt(data.main.temp);
    feelsLike.textContent = parseInt(data.main.feels_like);
    country.setAttribute("src", countryFlagURL + data.sys.country);
    weatherType.textContent = data.weather[0].description;
    typeIcon.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${iconId}.png`
    );
    humidity.textContent = data.main.humidity + "%";
    wind.textContent = data.wind.speed + " km/h";

    document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${data.weather[0].description}')`;

    errorMsg.style.display = "none";
    dataContainer.classList.remove("hide");
  }

  console.log(data.cod);
}

// Event handlers
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const city = cityInput.value;
  showWeatherData(city);
});
