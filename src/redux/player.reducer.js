const defaultPlayersState = {
  ship: {
    ship: 1,
    hullStrength: 10,
    shield: 20,
    fuel: 100,
    cargoContainers: 10
  },
  person: {
    credits: 1000,
    rank: 0,
    experience: 0,
    pilotSkill: 0,
    fighterSkill: 0,
    traderSkill: 0,
    engineerSkill: 0
  },

  status: {
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

// const defaultPlanetsState = {
//     asfdgih: {
//       x: 0.01,
//       y: 0.01,
//       name: "Starting"
//     },
//   };
