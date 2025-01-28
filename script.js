const apiKey = "a8246e85421ac124c2fb8433391273b8";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
        if (!response.ok) throw new Error("City not found");
        const data = await response.json();

        document.querySelector(".city").textContent = data.name;
        document.querySelector(".temp").textContent = `${Math.round(data.main.temp)}°c`;
        document.querySelector(".humidity").textContent = `${data.main.humidity}%`;
        document.querySelector(".wind").textContent = `${data.wind.speed} km/h`;

        const weatherCondition = data.weather[0].main;
        const iconMap = {
            Clouds: "images/clouds.png",
            Clear: "images/clear.png",
            Rain: "images/rain.png",
            Drizzle: "images/drizzle.png",
            Mist: "images/mist.png",
        };
        weatherIcon.src = iconMap[weatherCondition] || "images/default.png";
    } catch (error) {
        alert("Error: " + error.message);
    }
}

searchBtn.addEventListener("click", () => {
    if (searchBox.value.trim() !== "") {
        checkWeather(searchBox.value);
    } else {
        alert("Please enter a city name!");
    }
});
