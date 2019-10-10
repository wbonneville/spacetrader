// select planet is the specific id selected
const travelCurrentPlanet = (state = null, action) => {
  switch (action.type) {
    case "CURRENT_PLANET":
      // ID
      return action.planetId;
    default:
      return state;
  }
};

export default travelCurrentPlanet;
