import { TECH_LEVELS } from './planetData';
import { randomRange } from './planetData';
import { RESOURCE_DEFINITIONS } from './planetData';
import { POLITICAL_SYSTEMS } from './planetData';
import { NEWS } from './planetData';
import { EQUIPMENT } from './planetData';
import { SHIPS } from './shipData';

const shortid = require('shortid');

function generatePlanet() {
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
