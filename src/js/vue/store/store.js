import Vue from 'vue';

/* Vuex is actually useless for this project, but I need to learn this thing… */
import Vuex from 'vuex';

Vue.use(Vuex);

/* The APIs.js file should hold the Google Geocode API and OpenWeatherMap API keys
 * This file is .gitignored
 * You should obtain your own keys and make a file like:
 *
 * export const keys = {
 *   geocodingApiKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
 *   owmApiKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
 * }
 *
 * or just enter your key strings in state object
 */
import { keys } from './APIs';

export const store = new Vuex.Store({
  state: {
    location: {
      coords: {
        lat: 37.9838096,
        lng: 23.7275388
      },
      text: 'Athens, Greece'
    },
    geocodingApiKey: keys.geocodingApiKey,
    owmApiKey: keys.owmApiKey
  },

  mutations: {
    updateLocation(state, location) {
      state.location.coords = location[0];
      state.location.text = location[1];
    }
  }
});
