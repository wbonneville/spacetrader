const marketGeneration = (state = {}, action) => {
  switch (action.type) {
    case "CREATE_MARKET":
      return { ...state, [action.planetId]: action.marketData };
    default:
      return state;
  }
};

export default marketGeneration;
