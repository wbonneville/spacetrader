import {
  TECH_LEVELS,
  randomRange,
  RESOURCE_DEFINITIONS,
  POLITICAL_SYSTEMS,
  NEWS,
  EQUIPMENT,
  PLANET_NAMES_ONE
} from "./planetData";

// This function generates the planet

const shortid = require("shortid");

function generatePlanet() {
  // set planetName = to random number from planet names array
  let planetName =
    PLANET_NAMES_ONE[Math.floor(Math.random() * PLANET_NAMES_ONE.length)];

  // create set of two random numbers
  let twoNumbers = Math.floor(Math.random() * (99 - 10 + 1) + 10);

  // create set of three random numbers
  let threeNumbers = Math.floor(Math.random() * (999 - 100 + 1) + 100);

  // if planet name === Kepler, append three numbers
  if (planetName === "Kepler") {
    planetName = "Kepler " + threeNumbers;
  }

  // if planet name === HD, append two numbers
  if (planetName === "HD") {
    planetName = "HD " + twoNumbers;
  }

  // if planet name === OGLE-, append two numbers
  if (planetName === "OGLE-") {
    planetName = "OGLE- " + twoNumbers;
  }

  // use random shortid for planetId
  const planetId = shortid.generate();
  // techLevel = random tech level from array
  const techLevel = Math.floor(Math.random() * TECH_LEVELS.length);
  // random political system
  const politicalSystem = Object.keys(POLITICAL_SYSTEMS)[
    Math.floor(Math.random() * Object.keys(POLITICAL_SYSTEMS).length)
  ];
  // random news
  const news = Math.floor(Math.random() * NEWS.length);

  // planet data
  const planetData = {
    // planet name = to planet name
    planetName,
    // set x and y to random numbers
    x: Math.random(),
    y: Math.random(),
    techLevel,
    politicalSystem,
    news
  };

  // set market data to empty object
  // when a planet is clicked data will be stored in object
  const marketData = {};

  Object.entries(RESOURCE_DEFINITIONS).forEach(([resourceName, definition]) => {
    const baseAmount = Math.round(randomRange(definition.min, definition.max));
    const actualAmount = baseAmount * techLevel;
    marketData[resourceName] = actualAmount;
  });

  return { planetId, planetData, marketData };
}

export default generatePlanet;
