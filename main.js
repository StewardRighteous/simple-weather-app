const APIKEY = "EKXD36QWFM5NSGPP8S57846J4";
const searchButton = document.querySelector("button");
const locationInput = document.querySelector("input#location");
const weatherDetailsContainer = document.querySelector(".weather-details");
const weatherImage = document.querySelector("img");
const weatherLocationHeader = document.querySelector("h1");
const weatherTemp = document.querySelector("h2");
const weatherDescription = document.querySelector("h3");
const isCelsiusCheckbox = document.querySelector("input#celsius-fahrenheit");

let weatherInFahrenheit;

function convertToCelsius(fahrenheit) {
  let celsius;
  celsius = ((fahrenheit - 32) * 5) / 9;
  return celsius;
}

// Shows the weather in Celsius or Fahrenheit according to checkbok
function showWeatherInCelsiusOrFahrenheit() {
  if (isCelsiusCheckbox.checked) {
    weatherTemp.textContent = `${Math.round(
      convertToCelsius(weatherInFahrenheit)
    )} ℃`;
  } else {
    weatherTemp.textContent = `${Math.round(weatherInFahrenheit)} ℉`;
  }
}

// Shows weather details in UI
async function showWeatherInContainer(currentLocation) {
  let weatherData = await getWeatherData(currentLocation);
  if (!weatherData) {
    alert("TRY AGAIN");
  } else {
    weatherLocationHeader.textContent = `${weatherData.resolvedAddress}`;
    weatherDescription.textContent = `${weatherData.currentConditions.conditions}`;

    let icon = `./icons/${weatherData.currentConditions.icon}.svg`;
    weatherImage.src = icon;

    weatherInFahrenheit = weatherData.currentConditions.temp;
    showWeatherInCelsiusOrFahrenheit();
  }
}

async function getWeatherData(location) {
  try {
    let link = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${APIKEY}`;
    let fetchWeatherDetails = await fetch(link, { mode: "cors" });

    if (fetchWeatherDetails.status == 400) {
      alert("The City Does Not Exist!");
    } else {
      if (!fetchWeatherDetails.ok) {
        console.log("Error");
      } else {
        let weatherDetails = await fetchWeatherDetails.json();
        return weatherDetails;
      }
    }
  } catch (err) {
    alert(`Error : ${new Error(err)}`);
  }
}

searchButton.addEventListener("click", (e) => {
  e.preventDefault(); // Stops reloading of page when the button is clicked (reload erases async details and causes failures )
  if (locationInput.value.length == 0) {
    alert("Enter Location");
  } else {
    weatherDetailsContainer.style.display = "flex";
    weatherImage.src = "./loading.gif";
    showWeatherInContainer(locationInput.value);
  }
});

isCelsiusCheckbox.addEventListener("change", showWeatherInCelsiusOrFahrenheit);

weatherDetailsContainer.style.display = "none";
