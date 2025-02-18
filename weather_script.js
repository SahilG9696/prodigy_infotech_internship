const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key
const searchBtn = document.getElementById("searchBtn");
const currentLocationBtn = document.getElementById("currentLocationBtn");
const locationInput = document.getElementById("locationInput");
const cityElement = document.getElementById("city");
const tempElement = document.getElementById("temperature");
const conditionElement = document.getElementById("condition");

async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            updateWeather(data);
        } else {
            alert("City not found!");
        }
    } catch (error) {
        console.error("Error fetching weather:", error);
        alert("Error fetching weather data.");
    }
}

function updateWeather(data) {
    cityElement.textContent = data.name;
    tempElement.textContent = `Temperature: ${data.main.temp}°C`;
    conditionElement.textContent = `Condition: ${data.weather[0].description}`;
}

searchBtn.addEventListener("click", () => {
    const city = locationInput.value;
    if (city) fetchWeather(city);
});

currentLocationBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
            
            try {
                const response = await fetch(url);
                const data = await response.json();
                updateWeather(data);
            } catch (error) {
                console.error("Error fetching weather:", error);
                alert("Error fetching weather data.");
            }
        });
    } else {
        alert("Geolocation not supported.");
    }
});
