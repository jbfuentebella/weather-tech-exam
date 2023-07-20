import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";
import { City } from "country-state-city";

const apiKey = "3e8077eeb6fd4f178530efc4774fe33b";

function App() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const countryCode = "CA";
  const cities = City.getCitiesOfCountry(countryCode);
  const formattedCities = cities.map(({ name }) => ({
    value: name,
    label: name,
  }));

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
    fetchWeatherData(selectedOption.value);
  };

  const fetchWeatherData = async (city) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div className="App">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 ">
        <div className="mx-auto max-w-lg border-2">
          <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
            Weather App
          </h1>

          <div className="w-full mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-2xl sm:p-6 lg:p-8">
            <div className="w-full">
              <Select
                options={formattedCities}
                value={selectedCity}
                onChange={handleCityChange}
              />
              {weatherData && (
                <div class="mt-2">
                  <h2>{weatherData.name}</h2>
                  <p>Temperature: {weatherData.main.temp} °C</p>
                  <p>Weather: {weatherData.weather[0].description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
