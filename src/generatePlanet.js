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
  const equipment = Object.keys(EQUIPMENT)[
    Math.floor(Math.random() * Object.keys(EQUIPMENT).length)
  ];
  const news = Math.floor(Math.random() * NEWS.length);

  // The code below doesn't work! But why?
  // const politicalSystem = Math.floor(
  //   Math.random() * Object.keys(POLITICAL_SYSTEMS).length
  // );

  // for (var key in SHIPS) {
  //   for (var key2 in SHIPS[key]) {
  //     console.log(key, key2, SHIPS[key][key2]);
  //   }
  // }

  const ships = Object.keys(SHIPS)[
    Math.floor(Math.random() * Object.keys(SHIPS).length)
  ];

  const planetData = {
    x: Math.random(),
    y: Math.random(),
    techLevel,
    politicalSystem,
    news,
    equipment,
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
