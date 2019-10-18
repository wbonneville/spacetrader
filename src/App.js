import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

// data

import { TECH_LEVELS } from './planetData';
import { POLITICAL_SYSTEMS } from './planetData';
import { NEWS } from './planetData';
// import { EQUIPMENT } from './planetData';

// actions
import { selectPlanet } from './redux/selectPlanet.action';
import { createPlanet } from './redux/planet.action';
import { createMarket } from './redux/market.action';
import { createPlayer } from './redux/player.action';
import { warpPlayer } from './redux/warp.action';

import generatePlanet from './generatePlanet';

const GalacticChart = styled.canvas`
  background-color: black;
  width: 1000px;
  height: 500px;
`;

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
        ctxOne.fillStyle = 'white';
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

  return (
    <div className="App">
      <div className="row center-xs">
        <div className="col-xs-4">
          <h4>Current Planet Data</h4>
          {player.planetId && <p>You warped to {player.planetId}</p>}
          {currentPlanetData && (
            <React.Fragment>
              <p> X-Coordinate: {currentPlanetData.x}</p>
              <p>Y-Coordinate: {currentPlanetData.y}</p>
              <p>Tech Level: {TECH_LEVELS[currentPlanetData.techLevel]}</p>
              <p>
                Political System:
                {POLITICAL_SYSTEMS[currentPlanetData.politicalSystem]}
              </p>
              <p> News: {NEWS[currentPlanetData.news]}</p>
              <p>
                Market:{' '}
                {Object.keys(currentMarketData).map(key => (
                  <div>
                    {key}: {currentMarketData[key]}
                  </div>
                ))}
              </p>
              <div>
                {currentPlanetData.ships.map(ship => (
                  <p key={ship.shipId}>
                    {ship.displayName}: Hull Strength: {ship.hullStrength}
                  </p>
                ))}
              </div>
            </React.Fragment>
          )}
        </div>

        <div className="col-xs-4">
          <h4>Player Stats</h4>
          <p>Cash: {player.person.credits}</p>
          <p>Rank: {player.person.rank}</p>
          <p>Experience: {player.person.experience}</p>
          <p>Piloting Skill: {player.person.pilotSkill}</p>
          <p>Fighter Skill: {player.person.fighterSkill}</p>
          <p>Trader Skill: {player.person.traderSkill}</p>
          <p>Engineer Skill: {player.person.engineerSkill}</p>
          <p>Empty Cargo Bays: {player.person.emptyBays}</p>
          {player.status.normal && (
            <p>Player Status: Good Standing {player.status.normal}</p>
          )}
        </div>

        <div className="col-xs-4">
          <h4>Selected Planet Data</h4>

          {selectedPlanet && <p>Planet ID: {selectedPlanet}</p>}

          {selectedPlanetData && (
            <React.Fragment>
              <p>X-Coordinate: {selectedPlanetData.x}</p>
              <p>Y-Coordinate: {selectedPlanetData.y}</p>
              <p>Tech Level: {TECH_LEVELS[selectedPlanetData.techLevel]}</p>
              <p>
                Political System:{' '}
                {POLITICAL_SYSTEMS[selectedPlanetData.politicalSystem]}
              </p>
              <p>News: {NEWS[selectedPlanetData.news]}</p>
              <p>
                Market:{' '}
                {Object.keys(selectedMarketData).map(key => (
                  <div>
                    {key}: {selectedMarketData[key]}
                  </div>
                ))}
              </p>
              <div>
                {selectedPlanetData.ships.map(ship => (
                  <p key={ship.shipId}>
                    {ship.displayName}: Hull Strength: {ship.hullStrength}
                  </p>
                ))}
              </div>
            </React.Fragment>
          )}
        </div>
      </div>

      <div className="row center-xs">
        <div className="col-xs-12">
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
            width={2000}
            height={1000}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
