export function createPlayer(shipId, planetId) {
  return {
    type: 'CREATE_PLAYER',
    shipId,
    planetId,
  };
}
