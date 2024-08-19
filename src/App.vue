<template>
  <div id="app">
    <AutoCompleteInput
      placeholder="Enter city"
      @placeSelected="saveLocation"
    />
    <Weather v-if="savedCity" :city="savedCity" />
  </div>
</template>

<script>
import { ref } from 'vue';
import AutoCompleteInput from './components/AutoCompleteInput.vue';
import Weather from './components/Weather.vue';

export default {
  name: 'App',
  components: {
    AutoCompleteInput,
    Weather,
  },
  setup() {
    const savedCity = ref(localStorage.getItem('savedCity'));

    const saveLocation = (city) => {
      if (city) {
        localStorage.setItem('savedCity', city);
        savedCity.value = city;
      } else {
        localStorage.removeItem('savedCity');
        savedCity.value = null;
      }
    };

    return {
      savedCity,
      saveLocation,
    };
  },
};
</script>

<style>
/* Add basic styling */
#app {
  text-align: center;
  margin-top: 20px;
}
</style>