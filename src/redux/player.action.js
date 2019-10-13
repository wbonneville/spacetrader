export function createPlayer(shipId) {
  return {
    type: 'CREATE_PLAYER',
    shipId,
  };
}
