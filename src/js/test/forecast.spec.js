import { shallowMount } from '@vue/test-utils';
import expect from 'expect';
import { EventBus } from '../vue/helpers/event-bus';

import { keys } from '../vue/store/APIs';
import { store } from '../vue/store/store';

import Forecast from '../vue/components/Forecast.vue';

describe('Forecast', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Forecast, {
      store,
      attachToDocument: true
    });
  });

  it('renders a vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it('responds with an error to render empty data event', () => {
    EventBus.$emit('renderWeather', {});

    expect(wrapper.vm.errorWeatherData).toBe(true);
  });

  it('renders valid weather data', () => {
    EventBus.$emit('renderWeather', {"cod":"200","message":0.0035,"cnt":40,"list":[{"dt":1526299200,"main":{"temp":26.61},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"sys":{"pod":"d"}},{"dt":1526310000,"main":{"temp":25.43},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"sys":{"pod":"d"}},{"dt":1526320800,"main":{"temp":22.04},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"sys":{"pod":"n"}},{"dt":1526331600,"main":{"temp":19.28},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"sys":{"pod":"n"}},{"dt":1526342400,"main":{"temp":18},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"sys":{"pod":"n"}},{"dt":1526353200,"main":{"temp":17.66},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"sys":{"pod":"n"}},{"dt":1526364000,"main":{"temp":21.7},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"sys":{"pod":"d"}},{"dt":1526374800,"main":{"temp":24.87},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"sys":{"pod":"d"}},{"dt":1526385600,"main":{"temp":25.39},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"sys":{"pod":"d"}},{"dt":1526396400,"main":{"temp":24.24},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"sys":{"pod":"d"}},{"dt":1526407200,"main":{"temp":21.48},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"sys":{"pod":"n"}},{"dt":1526418000,"main":{"temp":21.28},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04n"}],"sys":{"pod":"n"}},{"dt":1526428800,"main":{"temp":21.6},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02n"}],"sys":{"pod":"n"}},{"dt":1526439600,"main":{"temp":20.11},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02n"}],"sys":{"pod":"n"}},{"dt":1526450400,"main":{"temp":22.6},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02d"}],"sys":{"pod":"d"}},{"dt":1526461200,"main":{"temp":24.59},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"sys":{"pod":"d"}},{"dt":1526472000,"main":{"temp":24.82},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"sys":{"pod":"d"}},{"dt":1526482800,"main":{"temp":24.73},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"sys":{"pod":"d"}},{"dt":1526493600,"main":{"temp":22.01},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"sys":{"pod":"n"}},{"dt":1526504400,"main":{"temp":19.6},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"sys":{"pod":"n"}},{"dt":1526515200,"main":{"temp":19.06},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02n"}],"sys":{"pod":"n"}},{"dt":1526526000,"main":{"temp":18.59},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03n"}],"sys":{"pod":"n"}},{"dt":1526536800,"main":{"temp":22.16},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"sys":{"pod":"d"}},{"dt":1526547600,"main":{"temp":19.83},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"sys":{"pod":"d"}},{"dt":1526558400,"main":{"temp":23.1},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"sys":{"pod":"d"}},{"dt":1526569200,"main":{"temp":23.57},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"sys":{"pod":"d"}},{"dt":1526580000,"main":{"temp":21.23},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02n"}],"sys":{"pod":"n"}},{"dt":1526590800,"main":{"temp":19.56},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03n"}],"sys":{"pod":"n"}},{"dt":1526601600,"main":{"temp":19.24},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04n"}],"sys":{"pod":"n"}},{"dt":1526612400,"main":{"temp":19.14},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04n"}],"sys":{"pod":"n"}},{"dt":1526623200,"main":{"temp":21.12},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],"sys":{"pod":"d"}},{"dt":1526634000,"main":{"temp":23.26},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],"sys":{"pod":"d"}},{"dt":1526644800,"main":{"temp":24.55},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02d"}],"sys":{"pod":"d"}},{"dt":1526655600,"main":{"temp":23.94},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"sys":{"pod":"d"}},{"dt":1526666400,"main":{"temp":21.91},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02n"}],"sys":{"pod":"n"}},{"dt":1526677200,"main":{"temp":20.44},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04n"}],"sys":{"pod":"n"}},{"dt":1526688000,"main":{"temp":19.91},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03n"}],"sys":{"pod":"n"}},{"dt":1526698800,"main":{"temp":19.48},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04n"}],"sys":{"pod":"n"}},{"dt":1526709600,"main":{"temp":21.59},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"sys":{"pod":"d"}},{"dt":1526720400,"main":{"temp":23.69},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02d"}],"sys":{"pod":"d"}}]});

    expect(wrapper.vm.weatherData).toBeTruthy();
  });
});
