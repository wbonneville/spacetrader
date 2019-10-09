const shipGeneration = (state = {}, action) => {
  switch (action.type) {
    case "CREATE_SHIP":
      // return
      return { ...ships, [ShipId]: { ...SHIPS[Flea] } };
    default:
      return state;
  }
};

export default shipGeneration;
