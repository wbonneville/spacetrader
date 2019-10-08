const planetGeneration = (state = {}, action) => {
  switch (action.type) {
    case "CREATE_PLANET":
      return { ...state, [action.planetId]: action.planetData };
    default:
      return state;
  }
};

export default planetGeneration;
