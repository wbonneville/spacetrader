import { SHIPS } from './shipData';

const shortid = require('shortid');

function generateShip() {
  const shipId = shortid.generate();
  const shipData = SHIPS;

  return { shipId, shipData };
}

export default generateShip;
