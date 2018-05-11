export const updateLocation = (state, location) => {
  state.location.coords = location[0];
  state.location.text = location[1];
};
