import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import expect from 'expect';
import moxios from 'moxios';

const localVue = createLocalVue();
localVue.use(Vuex);

import { keys } from '../vue/store/APIs';
import { store } from '../vue/store/store';

import Location from '../vue/components/Location.vue';

describe('Location', () => {
  let wrapper;

  beforeEach(() => {
    moxios.install();

    wrapper = shallowMount(Location, {
      localVue,
      store,
      attachToDocument: true
    });
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('renders a vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it('initializes the v-select element', () => {
    expect(wrapper.find('.v-select').element).toBeDefined();
  });

  it('feeds the default location to v-select', () => {
    expect(wrapper.find('.selected-tag').text()).toBe(store.state.location.text);
  });

  it('gets location suggestions from the API and updates the component options', (done) => {
    wrapper.vm.onSearch('Irakleiou 61', () => {});

    moxios.stubRequest(/.?address/g, {
      response: {
        results: [
          {
            "formatted_address" : "Irakliou, Athina 111 41, Greece",
            "geometry" : {
              "location" : {
                "lat" : 38.0175327,
                "lng" : 23.7395081
              }
            }
          }
        ]
      }
    });

    moxios.wait(() => {
      expect(wrapper.vm.options[0].text).toBe('Irakliou, Athina 111 41, Greece');
      done();
    }, 600) /* the _fetchLocationSuggestion Vuex action that fetches suggestion is debounced! */
  });

  it('handles location suggestions API error', (done) => {
    wrapper.vm.onSearch('Άνω Πατήσια', () => {});

    moxios.stubRequest(/.?address/g, {
      response: {
        results: [
          {
            "formatted_address" : "Pl. Omonias 19a, Athina 104 31, Greece"
          }
        ]
      }
    });

    moxios.wait(() => {
      expect(wrapper.vm.message.className).toBe('alert');
      done();
    }, 600) /* the _fetchLocationSuggestion Vuex action that fetches suggestion is debounced! */
  });

  it('gets a “friendly” name for the selected coords', (done) => {
    wrapper.vm.geoSuccess({ coords: { latitude: 37.9838096, longitude: 23.7275388 } });

    moxios.stubRequest(/.?latlng/g, {
      response: {
        results: [
          {
            "formatted_address" : "Pl. Omonias 19a, Athina 104 31, Greece"
          }
        ]
      }
    });

    moxios.wait(() => {
      expect(wrapper.vm.$store.state.location.text).toBe('Pl. Omonias 19a, Athina 104 31, Greece');
      done();
    })
  });

  it('handles errors when trying to fetch a “friendly” name for the selected coords', (done) => {
    const pos = {
      coords: {
        latitude: -37.9838096,
        longitude: 23.7275388
      }
    };

    wrapper.vm.geoSuccess(pos);

    moxios.stubRequest(/.?latlng/g, {
      response: {
        results: []
      }
    });

    moxios.wait(() => {
      expect(wrapper.vm.message.className).toBe('alert');
      done();
    })
  });

  it('handles fetching weather forecast errors', (done) => {
    const pos = {
      coords: {
        latitude: 37.9838096,
        longitude: 23.7275388
      }
    };

    wrapper.vm.getWeatherData(pos, 'Pl. Omonias 19a, Athina 104 31, Greece');

    moxios.stubRequest(/.forecast/g, {
      response: {
        list: []
      }
    });

    moxios.wait(() => {
      expect(wrapper.vm.message.className).toBe('alert');
      done();
    })
  });
});
