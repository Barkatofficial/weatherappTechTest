
const apiKey = '136b378aa39df45706bd7dfa6836251a'; 
const weatherContainer = document.getElementById('weather-container');
const getWeatherButton = document.getElementById('get-weather');
const cityInput = document.getElementById('city-input');


async function fetchWeather(city) {
  try {

    weatherContainer.textContent = 'Fetching weather data...';

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );


    if (!response.ok) {
      throw new Error('City not found');
    }

    const data = await response.json();

    console.log("data",data)

    displayWeather(data);
  } catch (error) {
    weatherContainer.textContent = `Error: ${error.message}`;
  }
}

function displayWeather(data) {
  const { name, main, weather } = data;
  const temperature = main.temp; 
  const humidity = main.humidity;
  const condition = weather[0].description; 
  const icon = weather[0].icon;

  // Update the DOM
  weatherContainer.innerHTML = `
    <h2>${name}</h2>
    <p>Temperature: ${temperature}°C</p>
    <p>Humidity: ${humidity}°C</p>
    <p>Condition: ${condition}</p>
    <img id="weather-icon" src="https://openweathermap.org/img/wn/${icon}.png" alt="${condition}" />
  `;
}

// Event listener for button click
getWeatherButton.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) {
    fetchWeather(city);
  } else {
    weatherContainer.textContent = 'Please enter a city name.';
  }
});
