let city = document.getElementById('city');
let getWeather = document.getElementById('getWeather');
let weather = document.getElementById('current-weather');
let airconditions = document.getElementById('airconditions');

getWeather.addEventListener('click', () => {
  const cityName = city.value.trim(); // Get city name from input

  if (!cityName) {
    weather.innerText = "Please enter the city name";
    return;
  }

  const apiKey = "149649f9049e3a1ddb38ab619062858b";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
  console.log(apiUrl);

  // Fetch weather data
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found or unable to fetch weather data.");
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      // Extract and display weather details
      const { name, main, weather: weatherDetails, wind, sys } = data;

      const weatherDescription = weatherDetails[0].main.toLowerCase();

      // Map weather descriptions to icon images
      let weatherIcon = "";
      if (weatherDescription.includes("clear")) {
        weatherIcon = "clear-sky.png";
      } else if (weatherDescription.includes("clouds")) {
        weatherIcon = "cloudy-day.png";
      } else if (weatherDescription.includes("rain")) {
        weatherIcon = "rain.png";
      } else if (weatherDescription.includes("snow")) {
        weatherIcon = "snow.png";
      } else if (weatherDescription.includes("thunderstorm")) {
        weatherIcon = "thunderstorm.png";
      } else if (weatherDescription.includes("haze")) {
        weatherIcon = "haze .png";
      } else {
        weatherIcon = "default-weather.png"; // Fallback image
      }

      // Format sunrise time
      const sunriseDate = new Date(sys.sunrise * 1000); // Convert from UNIX timestamp to milliseconds
      const sunriseTime = sunriseDate.toLocaleTimeString();

      // Update the DOM with weather details and icon
      weather.innerHTML = `
        <h1>${name}</h1>
        <h2>${main.temp}°C</h2>
        <div class="icon">
          <img src="${weatherIcon}" alt="${weatherDescription}" >
        </div>
      `;

      airconditions.innerHTML = `
        <p><strong>Sunrise:</strong> ${sunriseTime}</p>
        <p><strong>Wind:</strong> ${wind.speed} km/h</p>
      `;
    })
    .catch(error => {
      weather.innerText = error.message; // Display error message
    });
});



