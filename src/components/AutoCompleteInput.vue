<template>
	<input
	  type="text"
	  ref="autocompleteInput"
	  :placeholder="placeholder"
	  @input="onInput"
	/>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  
  export default {
	name: 'AutocompleteInput',
	props: {
	  placeholder: {
		type: String,
		default: 'Enter city',
	  },
	},
	emits: ['placeSelected'],
	setup(_, { emit }) {
	  const autocompleteInput = ref(null);
  
	  onMounted(() => {
		const autocomplete = new google.maps.places.Autocomplete(
		  autocompleteInput.value,
		  { types: ['(cities)'] }
		);
  
		autocomplete.addListener('place_changed', () => {
		  const place = autocomplete.getPlace();
		  if (place && place.geometry) {
			const city = place.name;
			emit('placeSelected', city);
		  }
		});
	  });
  
	  const onInput = () => {
		if (!autocompleteInput.value.value) {
		  emit('placeSelected', null); // Clear the selected city if input is cleared
		}
	  };
  
	  return { autocompleteInput, onInput };
	},
  };
  </script>
  
  <style scoped>
  input {
	width: 100%;
	padding: 8px;
	margin: 8px 0;
	box-sizing: border-box;
	border: 1px solid #ccc;
	border-radius: 4px;
  }
  </style>