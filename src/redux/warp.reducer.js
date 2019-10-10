// select planet is the specific id selected
const planetWarp = (state = null, action) => {
  switch (action.type) {
    case "PLANET_WARP":
      // Select ID'S
      return action.planetId, action.playerId;
    default:
      return state;
  }
};

export default planetWarp;
