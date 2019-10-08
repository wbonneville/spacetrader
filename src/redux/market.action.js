export function createMarket(planetId, marketData) {
  return {
    type: "CREATE_MARKET",
    planetId,
    marketData
  };
}
