import axios from 'axios';

/* request location suggestions from Google Geocode API */
export const fetchLocationSuggestions = ({ commit, state }, address) => {
  return new Promise((resolve, reject) => {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(address)}&key=${state.geocodingApiKey}`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => { /* eslint-disable-line */
        reject(error);
      });
  });
};

/* request location “friendly” name from Google */
export const fetchCoords = ({ commit, state }, location) => {
  return new Promise((resolve, reject) => {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${state.geocodingApiKey}`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => { /* eslint-disable-line */
        reject(error);
      });
  });
};

/* the API responds with a forecast for 5 days / 3 hours intervals — that would be 40 rows */
export const fetchWeather = ({ commit, state }, coords) => {
  return new Promise((resolve, reject) => {
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${coords.lat}&lon=${coords.lng}&appid=${state.owmApiKey}`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => { /* eslint-disable-line */
        reject(error);
      });
  });
};
