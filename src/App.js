import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

// data

import { TECH_LEVELS } from './planetData';
import { POLITICAL_SYSTEMS } from './planetData';
import { NEWS } from './planetData';
import { SHIPS } from './shipData';
import { EQUIPMENT } from './planetData';

// actions
import { selectPlanet } from './redux/selectPlanet.action';
import { createPlanet } from './redux/planet.action';
import { createMarket } from './redux/market.action';
import { createPlayer } from './redux/player.action';
import { warpPlayer } from './redux/warp.action';

import generatePlanet from './generatePlanet';

const GalacticChart = styled.canvas`
  background-color: #f6f6f6;
  width: 400px;
  height: 200px;
`;

// const GalacticChartTwo = styled(GalacticChart)`
//   background-color: #f7f7f7;
//   width: 200px;
//   height: 100px;
// `;

function App() {
  // dispatch hook
  const dispatch = useDispatch();

  // ref for the canvas
  const canvas = useRef();
  // const newCanvas = useRef();

  // called when app is rendered
  useEffect(() => {
    // loop creates x instances of planets
    for (var i = 0; i < 200; i++) {
      const { planetId, planetData, marketData } = generatePlanet();
      // dispatches action to bring data into the store
      dispatch(createPlanet(planetId, planetData));

      // dispatches action to bring market data into the store
      dispatch(createMarket(planetId, marketData));
    }
  }, [dispatch]);

  // this is the hook that selects planets data from state
  const planets = useSelector(state => state.planets);
  const markets = useSelector(state => state.markets);

  // get player data
  const player = useSelector(state => state.player);

  // selected planets data
  const selectedPlanet = useSelector(state => state.selectedPlanet);
  const selectedPlanetData = planets[selectedPlanet];
  const selectedMarketData = markets[selectedPlanet];

  // current planets data
  const currentPlanetData = planets[player.planetId];
  const currentMarketData = markets[player.planetId];
  const currentShipData = planets[player.shipId];

  console.log(currentShipData);
  console.log(currentPlanetData);
  console.log(currentMarketData);
  useEffect(() => {
    // provides context for the canvas to draw things
    const ctxOne = canvas.current.getContext('2d');

    // this loop takes planets as an argument and for each unique planet do code
    Object.keys(planets).forEach(planetId => {
      // get planet data
      const planet = planets[planetId];

      // set variables to random number on canvas

      const x = planet.x * canvas.current.width;
      const y = planet.y * canvas.current.height;

      // draw planet
      ctxOne.beginPath();
      ctxOne.moveTo(x, y);
      ctxOne.ellipse(x, y, 4, 4, 0, 0, Math.PI * 2);
      // if selected planet is equal to the current planet ID
      if (selectedPlanet === planetId) {
        ctxOne.fillStyle = 'blue';
      } else {
        ctxOne.fillStyle = 'green';
      }

      ctxOne.fill();
    });
  });

  // CLICK EVENT

  const handleCanvasClick = event => {
    const mouseX = event.pageX;
    const mouseY = event.pageY;
    const canvasX = canvas.current.offsetLeft;
    const canvasY = canvas.current.offsetTop;
    const x = (mouseX - canvasX) * 2;
    const y = (mouseY - canvasY) * 2;
    Object.keys(planets).forEach(planetId => {
      // get planet data
      const planet = planets[planetId];
      const planetX = planet.x * canvas.current.width;
      const planetY = planet.y * canvas.current.height;
      const deltaX = Math.abs(x - planetX);
      const deltaY = Math.abs(y - planetY);

      if (deltaX < 4 && deltaY < 4) {
        // dispatch planet selection action with our planet ID

        dispatch(selectPlanet(planetId));
        dispatch(createPlayer(planetId));
      }
    });
  };

  // click warp
  // check selected planets ID set players planet ID to selected planet
  const warp = event => {
    const planetId = selectedPlanet;
    dispatch(warpPlayer(planetId));
  };

  // for (var key in ships) {
  //   for (var key2 in ships[key]) {
  //     console.log(key, key2, ships[key][key2]);
  //   }
  // }

  // ship data

  // ships
  // key / property

  // <h1>Ship Name </h1>
  // <p> ship key: property </p>
  // <p> ship key: property </p>
  // <p> ship key: property </p>
  // <p> ship key: property </p>
  // <p> ship key: property </p>

  if (selectedPlanetData) {
    console.log();
  }

  return (
    <div className="App">
      <h1>Current Planet</h1>
      {player.planetId && <h1>You warped to {player.planetId}</h1>}
      <h1>Cash: {player.person.credits}</h1>
      <h1>Rank: {player.person.rank}</h1>
      <h1>Experience: {player.person.experience}</h1>
      <h1>Piloting Skill: {player.person.pilotSkill}</h1>
      <h1>Fighter Skill: {player.person.fighterSkill}</h1>
      <h1>Trader Skill: {player.person.traderSkill}</h1>
      <h1>Engineer Skill: {player.person.engineerSkill}</h1>
      <h1>Empty Cargo Bays: {player.person.emptyBays}</h1>
      {player.status.normal && (
        <h1>Player Status: Good Standing {player.status.normal}</h1>
      )}
      <h1>Current Planet Data</h1>
      {currentPlanetData && <p>X-Coordinate: {currentPlanetData.x}</p>}
      {currentPlanetData && <p>Y-Coordinate: {currentPlanetData.y}</p>}
      {currentPlanetData && (
        <p>Tech Level: {TECH_LEVELS[currentPlanetData.techLevel]}</p>
      )}
      {currentPlanetData && (
        <p>
          Political System:{' '}
          {POLITICAL_SYSTEMS[currentPlanetData.politicalSystem]}
        </p>
      )}
      {currentPlanetData && <p>News: {NEWS[currentPlanetData.news]}</p>}
      {/* {currentPlanetData && (
        <p>News: {EQUIPMENT[currentPlanetData.equipment]}</p>
      )} */}
      <h1>Shipyard</h1>

      <h1>Selected Planet Data</h1>

      {selectedPlanet && <h1>Planet ID: {selectedPlanet}</h1>}

      {selectedPlanetData && (
        <div>
          {selectedPlanetData.ships.map(ship => (
            <p key={ship.shipId}>
              {ship.displayName}
              <br></br>
              <br></br>
              Hull Strength: {ship.hullStrength}
            </p>
          ))}
        </div>
      )}

      {selectedPlanetData && <p>X-Coordinate: {selectedPlanetData.x}</p>}
      {selectedPlanetData && <p>Y-Coordinate: {selectedPlanetData.y}</p>}
      {selectedPlanetData && (
        <p>Tech Level: {TECH_LEVELS[selectedPlanetData.techLevel]}</p>
      )}
      {selectedPlanetData && (
        <p>
          Political System:{' '}
          {POLITICAL_SYSTEMS[selectedPlanetData.politicalSystem]}
        </p>
      )}
      {selectedPlanetData && <p>News: {NEWS[selectedPlanetData.news]}</p>}
      {selectedMarketData && (
        <h2>
          Market:{' '}
          {Object.keys(selectedMarketData).map(key => (
            <div>
              {key}: {selectedMarketData[key]}
            </div>
          ))}
        </h2>
      )}
      <h1>Galactic Chart</h1>
      {/* Move ship state to other planet */}
      {/* Warp to planet */}
      <h1>
        <button onClick={warp}>Warp</button>
      </h1>
      {/* <h1>You are now on planet {currentPlanetData} </h1> */}
      <GalacticChart
        id="a"
        onClick={handleCanvasClick}
        ref={canvas}
        width={800}
        height={400}
      />
      {/* <GalacticChartTwo
        id="b"
        onClick={handleCanvasClick}
        ref={newCanvas}
        width={800}
        height={400}
      /> */}
    </div>
  );
}

export default App;
