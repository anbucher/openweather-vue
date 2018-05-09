<template>
  <form class="location-form" method="post">
    <div class="callout small" :class="message.className" v-if="message.text">
      <p class="text-center">{{ message.text }}</p>
    </div>

    <fieldset class="input-group">
      <div class="input-group-button">
        <button class="button getGPS" type="button" @click="geolocation">Use GPS</button>
      </div>

      <span class="input-group-label">or search:</span>

      <v-select class="input-group-field"
        label="text"
        :filterable="false"
        :options="options"
        :value="location.text"
        @input="onSelect"
        @search="onSearch">
      </v-select>

      <!-- the Vue Select component has a bug when only one option is available _and_ is selected, and a submit button might be necessary here -->
    </fieldset>
  </form>
</template>

<script>
  import Vue from 'vue';
  import axios from 'axios';
  import { mapMutations, mapState } from 'vuex';
  import _debounce from 'lodash/debounce';
  import vSelect from '../vendor/vue-select/index';
  import { EventBus } from '../helpers/event-bus';

  Vue.component('v-select', vSelect);

  export default {
    computed: {
      /* http://babeljs.io/docs/plugins/transform-object-rest-spread/ */
      ...mapState(['location', 'geocodingApiKey', 'owmApiKey'])
    },

    data () {
      return {
        options: [],
        message: {
          className: 'primary',
          text: 'Remove the preselected location and search for you own!'
        }
      }
    },

    methods: {
      ...mapMutations(['updateLocation']),

      /* gets a list of place suggestions, returned from Google Geocode API, and feeds them to the Vue Select, via the _options_ data */
      buildLocationSuggestList (list) {
        this.options = [];

        list.forEach((item) => {
          this.options.push({
            text: item.formatted_address,
            coords: item.geometry.location
          });
        });
      },

      onSearch (search, loading) {
        loading(true);
        this.changeLocation(loading, search, this);
      },

      /* executes 500 ms after the last _keyup_ in Vue Select, and requests location suggestions from Google Geocode API */
      changeLocation: _debounce ((loading, txt, vm) => {
        if (txt.length > 2) {
          /* request location suggestions from Google Geocode API */
          axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(txt)}&key=${vm.geocodingApiKey}`)
            .then((response) => {
              loading(false);

              let places = response.data;

              if (places.results.length) {
                vm.message.text = '';

                vm.buildLocationSuggestList(places.results);
              } else {
                vm.message.className = 'alert';

                if (places.status == 'ZERO_RESULTS') {
                  vm.message.text = 'Cannot find the entered location!';
                } else {
                  vm.message.text = 'The API answered something completely useless!';
                }
              }
            })
            .catch((response) => { /* eslint-disable-line */
              loading(false);

              vm.message.className = 'alert';
              vm.message.text = 'Are you even online?';
            });
        }
      }, 0),

      /* executes when the browser can’t or the user won’t allow the use of GPS location */
      geoError (error) { /* eslint-disable-line */
        /* just disable the button! */

        document.querySelector('.getGPS').disabled = true;
      },

      /* executes when the GPS location is available, and tries to find Latitude and Longitude from Google Geocode API */
      geoSuccess (position) {
        /* got us the current location, maybe */
        let pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        /* request location “friendly” name from Google */
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${pos.lat},${pos.lng}&key=${this.geocodingApiKey}`)
          .then((response) => {
            const places = response.data;

            if (response.data.results.length) {
              // request weather data
              this.getWeatherData(pos, places.results[0].formatted_address);
            } else {
              this.message.className = 'alert';

              if (places.status == 'ZERO_RESULTS') {
                this.message.text = 'There is something wrong with those coords dude!';
              } else {
                this.message.text = 'The API answered something completely useless!';
              }
            }
          })
          .catch((response) => { /* eslint-disable-line */
            this.message.className = 'alert';
            this.message.text = 'Are you even online?';
          });
      },

      /* tries to find out the GPS position information of the browser — requires HTTPS and user approval
       * I don’t think that this can be mocked / tested, moving on…
       */
      geolocation () {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoError);
        }
      },

      /* requests the weather forecast from OpenWeatherMap API, using the Latitude and Longitude discovered earlier */
      getWeatherData (coords, text) {
        /* save the location address and coords to Vuex state */
        this.updateLocation([coords, text]);

        /* the API responds with a forecast for 5 days / 3 hours intervals — that would be 40 rows */
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${coords.lat}&lon=${coords.lng}&appid=${this.owmApiKey}`)
          .then((response) => {
            let weather = response.data;

            if (weather.list.length) {
              /* data rendering is another component */
              EventBus.$emit('renderWeather', weather);
            } else {
              this.message.className = 'alert';

              if (weather.cod == '400') {
                this.message.text = 'There is something wrong with those coords dude!';
              } else {
                this.message.text = 'The API answered something completely useless!';
              }
            }
          })
          .catch((error) => { /* eslint-disable-line */
            this.message.className = 'alert';
            this.message.text = 'Are you even online?';
          });
      },

      /* called from Vue Select, on selecting one of the available options */
      onSelect (selection) {
        /* this function is called at start too, because the options are updated with the defaults on _mounted()_ below, but the data are not there at that time */
        /* maybe I’m missing something here too… */

        if (selection && selection.text) {
          /* request data from OpenWeatherMap API */
          this.getWeatherData(selection.coords, selection.text);
        }
      }
    },

    mounted () {
      /* initialize the Vue Select component with the defaults, from Vuex */
      this.options = [
        {
          text: this.location.text,
          coords: {
            lat: this.location.coords.lat,
            lng: this.location.coords.lng
          }
        }
      ]

      /* get weather forecast for the default location */
      this.getWeatherData(this.location.coords, this.location.text);

      /* disable the GPS button, if the browser does not support the API at all */
      if (!navigator.geolocation) {
        document.querySelector('.getGPS').disabled = true;
      }
    }
  }
</script>

<style>
</style>
