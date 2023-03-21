const apiKey = "dd9ec81f2d2672d352f3fbc746477d59";
// const countryFlagURL = "https://countryflagsapi.com/png/";

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
const loadingElement = document.querySelector("#loading");

// Functions
async function getWeatherData(city) {
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

  const resp = await fetch(apiURL);
  const data = await resp.json();

  return data;
}

async function showWeatherData(city) {
  showLoading();
  const data = await getWeatherData(city)
    .then((data) => {
      changeData(data);
      hideLoading();
    })
    .catch((e) => {
      hideLoading();
      errorMsg.textContent =
        "Ocorreu um erro ao buscar o clima. Verifique sua conexão ou se houve um erro de digitação e tente novamente.";
      errorMsg.style.display = "block";
      dataContainer.classList.add("hide");
      console.log(e);
    });
}

function changeData(data) {
  let iconId = data.weather[0].icon;
  cityName.textContent = data.name;
  temperature.textContent = parseInt(data.main.temp);
  feelsLike.textContent = parseInt(data.main.feels_like);
  country.setAttribute(
    "src",
    `https://flagsapi.com/${data.sys.country}/flat/32.png`
  );
  weatherType.textContent = data.weather[0].description;
  typeIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconId}.png`
  );
  humidity.textContent = data.main.humidity + "%";
  wind.textContent = data.wind.speed + " km/h";

  document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${data.name}')`;

  errorMsg.style.display = "none";
  dataContainer.classList.remove("hide");
  cityInput.value = "";
}

function showLoading() {
  loadingElement.classList.add("show");
}

function hideLoading() {
  loadingElement.classList.remove("show");
}

// Event handlers
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const city = cityInput.value;
  showWeatherData(city);
});
