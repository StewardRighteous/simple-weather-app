let locationName = prompt("Enter a Location");
const APIKEY = "EKXD36QWFM5NSGPP8S57846J4";
let currentWeather;

async function getWeather() {
  try {
    let fetchWeatherDetails = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationName}?key=${APIKEY}`
    );
    let weatherDetails = await fetchWeatherDetails.json();
    console.log(weatherDetails);
  } catch (err) {
    console.log(err);
  }
}

getWeather();
