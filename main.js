const APIKEY = "EKXD36QWFM5NSGPP8S57846J4";
const searchButton = document.querySelector("button");
const locationInput = document.querySelector("input#location");
const showWeatherHeading = document.querySelector("h1");

function convertToCelsius(fahrenheit) {
  let celsius;
  celsius = ((fahrenheit - 32) * 5) / 9;
  return celsius;
}

async function showWeather(currentLocation) {
  let weatherData = await getWeatherData(currentLocation);
  let weather = `${convertToCelsius(weatherData.currentConditions.temp)}`;
  showWeatherHeading.textContent = weather;
}

async function getWeatherData(location) {
  try {
    let link = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${APIKEY}`;
    let fetchWeatherDetails = await fetch(link, { mode: "cors" });

    if (!fetchWeatherDetails.ok) {
      console.log("Error");
    } else {
      let weatherDetails = await fetchWeatherDetails.json();
      console.log(weatherDetails);
      return weatherDetails;
    }
  } catch (err) {
    console.error(err);
  }
}

searchButton.addEventListener("click", (e) => {
  e.preventDefault(); // Stops reloading of page when the button is clicked (reload erases async details and causes failures )
  if (locationInput.value.length == 0) {
    alert("Enter Location");
  } else {
    showWeather(locationInput.value);
  }
});
