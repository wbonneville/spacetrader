const shipGeneration = (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_SHIP':
      // return
      return { ...state, shipId: action.shipId };
    default:
      return state;
  }
};

export default shipGeneration;
