import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const apiKey = '3e8077eeb6fd4f178530efc4774fe33b';
const options = [
  { value: 'London', label: 'London' },
  { value: 'New York', label: 'New York' },
  { value: 'Tokyo', label: 'Tokyo' },
  // Add more cities as needed
];

function App() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

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
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">Weather App</h1>
      <Select options={options} value={selectedCity} onChange={handleCityChange} />
      {weatherData && (
        <div>
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;