export function warpToPlanet(playerId) {
  return {
    type: "PLANET_WARP",
    playerId
  };
}
