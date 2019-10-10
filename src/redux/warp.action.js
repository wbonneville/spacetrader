export function warpToPlanet(planetId, playerId) {
  return {
    type: "PLANET_WARP",
    planetId,
    playerId
  };
}
