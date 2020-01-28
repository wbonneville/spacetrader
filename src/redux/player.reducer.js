const defaultPlayersState = {
  shipId: "1",
  planetId: "",
  credits: 1000,
  rank: 0,
  experience: 0,
  pilotSkill: 0,
  fighterSkill: 0,
  traderSkill: 0,
  engineerSkill: 0,
  emptyBays: 15,

  status: {
    normal: true,
    pirate: false
  }
};

const playerGeneration = (state = defaultPlayersState, action) => {
  switch (action.type) {
    case "CREATE_PLAYER":
      // return everything inside state using spread operator
      return { ...state };
    case "WARP_PLAYER":
      // get everything inside of sate using spread operator, as well as the planet ID
      return {
        ...state,
        planetId: action.planetId
      };
    // case ADD_XP -- get the user state, and also update experience
    case "ADD_XP":
      return {
        ...state,
        experience: state.experience + 2,
        rank: state.rank + 0.02
      };
    default:
      return state;
  }
};

export default playerGeneration;
