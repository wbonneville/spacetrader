export function warpPlayer(planetId) {
  return {
    type: 'WARP_PLAYER',
    planetId,
  };
}
