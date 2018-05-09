import { createLocalVue, shallow } from '@vue/test-utils';
import Vuex from 'vuex';
import expect from 'expect';

const localVue = createLocalVue();
localVue.use(Vuex);

import { keys } from '../vue/store/APIs';
import { store } from '../vue/store/store';

import Forecast from '../vue/components/Forecast.vue';

describe('Forecast', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(Forecast, {
      localVue,
      store,
      attachToDocument: true
    });
  });

  it('renders a vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  /* I have no clue about how to test the rendering of the weather forecast,
   * since this markup is build after the _renderWeather_ event is emitted on the root EventBus
   * still searching for anwers… */
});
