// select planet is the specific id selected
const selectPlanet = (state = null, action) => {
  switch (action.type) {
    case "SELECT_PLANET":
      // ID
      return action.planetId;
    default:
      return state;
  }
};

export default selectPlanet;
