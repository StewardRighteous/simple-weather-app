const APIKEY = "EKXD36QWFM5NSGPP8S57846J4";
const searchButton = document.querySelector("button");
const locationInput = document.querySelector("input#location");
const weatherDetailsContainer = document.querySelector(".weather-details");
const weatherImage = document.querySelector("img");
const weatherLocationHeader = document.querySelector("h1");
const weatherTemp = document.querySelector("h2");
const weatherDescription = document.querySelector("h3");
const isCelsiusCheckbox = document.querySelector("input#celsius-fahrenheit");

function convertToCelsius(fahrenheit) {
  let celsius;
  celsius = ((fahrenheit - 32) * 5) / 9;
  return celsius;
}

// Shows weather details in UI
async function showWeatherInContainer(currentLocation) {
  let weatherData = await getWeatherData(currentLocation);
  console.log(weatherData);
  weatherLocationHeader.textContent = `${weatherData.resolvedAddress}`;
  weatherDescription.textContent = `${weatherData.currentConditions.conditions}`;

  let icon = `./icons/${weatherData.currentConditions.icon}.svg`;
  weatherImage.src = icon;

  if (isCelsiusCheckbox.checked) {
    weatherTemp.textContent = `${Math.round(
      convertToCelsius(weatherData.currentConditions.temp)
    )} ℃`;
  } else {
    weatherTemp.textContent = `${Math.round(
      weatherData.currentConditions.temp
    )} ℉`;
  }
}

async function getWeatherData(location) {
  try {
    let link = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${APIKEY}`;
    let fetchWeatherDetails = await fetch(link, { mode: "cors" });

    if (!fetchWeatherDetails.ok) {
      console.log("Error");
    } else {
      let weatherDetails = await fetchWeatherDetails.json();
      return weatherDetails;
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
    showWeatherInContainer(locationInput.value);
  }
});

isCelsiusCheckbox.addEventListener("change", );
