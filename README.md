> A simple Vue.js app, fetching weather forecast data for a user-selected location.

## Overview
I use the [Google Geocode API](https://developers.google.com/maps/documentation/geocoding/start) for location suggestions based on user input or GPS position (if available), and [OpenWeatherMap API](https://openweathermap.org/api) to render 5 days weather forecast.

I also use [Vuex](https://vuex.vuejs.org/en/) for state management, for no other reason than getting to know the workings of it. HTTP requests are handled with [axios](https://github.com/axios/axios). Finally, I use a local, patched version of [Vue Select component](http://sagalbot.github.io/vue-select/), with a [couple](https://github.com/sagalbot/vue-select/pull/512/commits/970d1da3c2fbcefeadb2ee8910cd383c98f56032) [of](https://github.com/sagalbot/vue-select/pull/528/commits/a1193f3c0f3fd75dd03dcd3d93d689af97b7513d) PRs baked in. It should be updated, eventually.

This app was made while I learn [webpack](https://webpack.js.org/), [Vue.js](https://vuejs.org/), ES6, Vuex, [Mocha](https://mochajs.org/) and [expect](https://facebook.github.io/jest/docs/en/expect.html) — and I have a lot to learn. I had to cheat and retrofit the tests, so this was not build with [TDD](https://en.wikipedia.org/wiki/Test-driven_development), but one has to start somewhere! I welcome constructive critisism and well documented PRs that whould make me, and anybody else, better developers!

## ToDo
- [] Use the SVGs of [Weather Icons](https://erikflowers.github.io/weather-icons/) instead of the font files
- [] Add more tests for the _Forecast_ component

## Instructions
If you want to run this project, you need a couple of API keys: [Google Geocoding API](https://developers.google.com/maps/documentation/geocoding/start#get-a-key) and [OpenWeatherMap](https://openweathermap.org/appid). These are saved in Vuex state (for no particular reason) — there is a related comment in `/src/js/vue/store.js`.

There are 4 _npm scripts_:
* `npm run dev` starts the _webpack-dev-server_ with your local IP at the default port (8080), for you to develop your application. I still have an issue with rebuilding and injecting the stylesheets and I will find a solution, sooner or later…
* `npm run build` compiles production-ready styles and scripts
* `npm run test` runs the Mocha / expect test, once, and
* `npm run watch` runs the above tests continuously, to enable true Test Driven Development
