const shortid = require("shortid");
const playerId = shortid.generate();
const defaultPlayersState = {
  playerId,

  person: {
    credits: 1000,
    rank: 0,
    experience: 0,
    pilotSkill: 0,
    fighterSkill: 0,
    traderSkill: 0,
    engineerSkill: 0,
    emptyBays: 15
  },

  status: {
    normal: true,
    pirate: false
  }
};

const playerGeneration = (state = defaultPlayersState, action) => {
  switch (action.type) {
    case "CREATE_PLAYER":
      return { ...state };
    default:
      return state;
  }
};

export default playerGeneration;
