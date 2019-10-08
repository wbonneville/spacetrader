export function createPlanet(planetId, planetData) {
  return {
    type: "CREATE_PLANET",
    planetId,
    planetData
  };
}
