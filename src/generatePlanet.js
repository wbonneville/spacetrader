import { TECH_LEVELS } from './planetData';
import { randomRange } from './planetData';
import { RESOURCE_DEFINITIONS } from './planetData';
import { POLITICAL_SYSTEMS } from './planetData';
import { NEWS } from './planetData';
import { EQUIPMENT } from './planetData';
import { SHIPS } from './shipData';
import { PLANET_NAMES_ONE } from './planetData';
// import { PLANET_NAMES_TWO } from './planetData';

const shortid = require('shortid');

function generatePlanet() {
  let planetName =
    PLANET_NAMES_ONE[Math.floor(Math.random() * PLANET_NAMES_ONE.length)];
  let twoNumbers = Math.floor(Math.random() * (99 - 10 + 1) + 10);

  let threeNumbers = Math.floor(Math.random() * (999 - 100 + 1) + 100);

  if (planetName === 'Kepler') {
    planetName = 'Kepler ' + threeNumbers;
  }

  if (planetName === 'HD') {
    planetName = 'HD ' + twoNumbers;
  }

  if (planetName === 'OGLE-') {
    planetName = 'OGLE- ' + twoNumbers;
  }

  const planetId = shortid.generate();
  const techLevel = Math.floor(Math.random() * TECH_LEVELS.length);
  const politicalSystem = Object.keys(POLITICAL_SYSTEMS)[
    Math.floor(Math.random() * Object.keys(POLITICAL_SYSTEMS).length)
  ];
  const news = Math.floor(Math.random() * NEWS.length);

  const ships = SHIPS;

  // for (var key in ships) {
  //   for (var key2 in ships[key]) {
  //     console.log(key2, ships[key][key2]);
  //   }
  // }

  // The code below doesn't work! But why?
  // const politicalSystem = Math.floor(
  //   Math.random() * Object.keys(POLITICAL_SYSTEMS).length
  // );

  const planetData = {
    planetName,
    x: Math.random(),
    y: Math.random(),
    techLevel,
    politicalSystem,
    news,
    ships,
  };

  const marketData = {};

  Object.entries(RESOURCE_DEFINITIONS).forEach(([resourceName, definition]) => {
    const baseAmount = Math.round(randomRange(definition.min, definition.max));
    const actualAmount = baseAmount * techLevel;
    marketData[resourceName] = actualAmount;
  });

  return { planetId, planetData, marketData };
}

export default generatePlanet;
