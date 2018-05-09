<template>
  <div class="grid-container">
    <the-location></the-location>
    <the-forecast></the-forecast>
  </div>
</template>

<script>
  import TheLocation from './Location.vue';
  import TheForecast from './Forecast.vue';

  export default {
    components: {
      TheLocation,
      TheForecast
    }
  }
</script>

<style>
</style>
