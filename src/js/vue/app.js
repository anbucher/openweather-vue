import Vue from 'vue';
import App from './components/App.vue';

import { store } from './store/store';
import { EventBus } from './helpers/event-bus';

new Vue({
  el: '#app',
  store,
  render: h => h(App)
});
