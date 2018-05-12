<template>
  <div class="container">
    <div class="callout small">
      <p class="text-center" v-html="selectedLocation"></p>
    </div>

    <div class="callout small alert" v-if="errorWeatherData">
      <p class="text-center">The sky is falling!</p>
    </div>

    <div class="forecast-grid">
      <div class="forecast-grid-col" v-for="day in weatherData" :key="day[0].dt">
        <h3 class="forecast-title">{{ day[0] | formattedDate }}</h3>

        <div class="media-object" v-for="hour in day" :key="hour.dt">
          <div class="media-object-section">
            <div class="thumbnail">
              <i class="wi" :class="hour | iconClassName"></i>
            </div>
          </div>
          <div class="media-object-section main-section">
            <h4 class="forecast-hourly-title"><time :datetime="hour.dt_txt">{{ hour | formattedTime }}</time></h4>
            <p>
              <strong>{{ Math.floor(hour.main.temp) }}</strong>&deg;
              {{ hour.weather[0].main }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';
  import { EventBus } from '../helpers/event-bus';

  export default {
    computed: {
      selectedLocation () {
        return `<strong>${this.$store.state.location.text}</strong> — ${this.$store.state.location.coords.lat}, ${this.$store.state.location.coords.lng}`;
      }
    },

    data () {
      return {
        errorWeatherData: false,
        weatherData: []
      }
    },

    created () {
      EventBus.$on('renderWeather', (weather) => {
        /* the weather forecast is an array of 40 items, one forecast for every 3 hours for 5 days beginning with the next 00, 03, 06, 09, 12, 15, 18, 21 hours, in UTC timestamps
         * the idea of the function below is to break those 40 items in days
         * the result is an array of 5 or 6 arrays (days) of objects, depending on the time of day */
        let sliceIndex = 0;
        let sliceEnd;

        if (weather.list && weather.list.length) {
          this.errorWeatherData = false;
          this.weatherData = [];

          let currentDay = moment.unix(weather.list[0].dt).get('date');

          weather.list.forEach( (item, index) => {
            let itemDay = moment.unix(item.dt).get('date');

            sliceEnd = index;

            if (itemDay != currentDay) {
              this.weatherData.push(weather.list.slice(sliceIndex, sliceEnd));
              currentDay = itemDay;
              sliceIndex = index;
            }
          } );

          this.weatherData.push(weather.list.slice(sliceIndex));
        } else {
          /* it is highly unlikely to reach this place without actual data along with the _renderWeather_ event, but for the sake of argument… */
          this.errorWeatherData = true;
          this.weatherData = [];
        }
      });
    },

    filters: {
      formattedDate (value) {
        return moment.unix(value.dt).format('dddd, D MMM');
      },

      formattedTime (value) {
        return moment.unix(value.dt).format('hh:mm a');
      },

      iconClassName (hour) {
        return `wi-owm-${(hour.sys.pod == 'd' ? 'day' : 'night')}-${hour.weather[0].id}`;
      }
    }
  }
</script>
