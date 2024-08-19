<template>
	<div class="weather">
	  <h2>Weather in {{ city }}</h2>
	  <p v-if="weather">
		Temperature: {{ weather.main.temp }}°C<br>
		Weather: {{ weather.weather[0].description }}<br>
		Wind Speed: {{ weather.wind.speed }} m/s
	  </p>
	  <p v-else-if="error">{{ error }}</p>
	  <p v-else>Loading...</p>
	</div>
  </template>
  
  <script>
  import { ref, onMounted, watch } from 'vue';
  import { getWeather } from '../services/WeatherService.js';
  
  export default {
	name: 'Weather',
	props: {
	  city: {
		type: String,
		required: true,
	  },
	},
	setup(props) {
	  const weather = ref(null);
	  const error = ref(null);
  
	  const fetchWeather = async () => {
		error.value = null; // Clear previous error
		weather.value = null; // Reset weather data
		try {
		  weather.value = await getWeather(props.city);
		} catch (err) {
		  error.value = `Failed to fetch weather data for ${props.city}`;
		}
	  };
  
	  watch(() => props.city, fetchWeather);
  
	  onMounted(fetchWeather);
  
	  return { weather, error };
	},
  };
  </script>
  
  <style scoped>
  .weather {
	font-family: Arial, sans-serif;
	margin: 20px;
  }
  </style>
 