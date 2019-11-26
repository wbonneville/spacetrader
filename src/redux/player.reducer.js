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
      return { ...state };
    case "WARP_PLAYER":
      return {
        ...state,
        planetId: action.planetId
      };
    case "ADD_XP":
      return { ...state, experience: state.experience + 2 };
    default:
      return state;
  }
};

export default playerGeneration;
