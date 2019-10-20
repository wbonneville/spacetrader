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

const Wrapper = styled.div`
  font-family: 'Helvetica Neue';
  margin-left: 3.5%;
  margin-right: 3.5%;
`;

const Header = styled.div`
  margin-bottom: 4%;
  & h1 {
    font-family: 'Helvetica Neue';
    font-size: 65px;
    color: white;
    letter-spacing: 2px;
    font-weight: 100;
  }
  & a {
    color: white;
    font-weight: 100;
    text-decoration: underline;
    opacity: 0.7;
  }
  & h4 {
    color: white;
    font-weight: 100;
    opacity: 0.7;
  }
`;

// const CurrentStyleRow = styled.div`
//   color: white;
// `;

const GalacticChart = styled.canvas`
  background-color: black;
  width: 600px;
  height: 300px;
  border: 1px solid white;
`;

const GalacticChartStyles = styled.div`
  & h1 {
    color: white;
  }
`;

const CurrentStyleCol = styled.div`
  text-align: left;
  padding-top: 2%;
  padding-left: 5%;
  background-color: rgb(16, 16, 16);
  border: 1px solid white;
  color: white;
`;

const CurrentStyle = styled.div`
  justify-content: left;

  & p {
    display: inline-block;
    font-size: 14px;
  }
`;

const SelectedStyle = styled.div`
  color: white;
  & p {
    display: inline-block;
    font-size: 12px;
  }
`;

const Button = styled.button`
  margin-top: 2%;
  margin-bottom: 1%;
  padding: 10px;
  font-size: 10px;
  width: 100px;
  background-color: rgb(16, 16, 16);
  color: white;
  border: 1px solid white;
  text-transform: uppercase;
`;

const PlayerStyle = styled.div`
  text-align: left;
  background-color: rgb(16, 16, 16);
  padding-top: 2%;
  padding-bottom: 2%;
  padding-left: 5%;
  border: 1px solid white;
  margin-top: 4%;
  margin-left: 12.5%;
  color: white;
  & p {
    font-size: 14px;
  }
`;

const CurrentMarketBtns = styled.div`
  text-align: left;
  justify-content: left;
  margin: 0 auto;

  & button {
    background-color: white;
    border: 1px solid black;
    font-size: 16px;
    padding: 8px;
  }

  & .item {
    background-color: white;
  }
  & .number {
    background-color: #ee8f8a;
  }
  & .buy {
    background-color: white;
  }
  & .sell {
    background-color: white;
  }
`;

const MarketTitle = styled.h2`
  font-weight: 100;
`;

const ShipsTitle = styled.h2`
  font-weight: 100;
`;

const SystemInfoTitle = styled.h1`
  font-weight: 100;
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
    for (var i = 0; i < 1000; i++) {
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
      ctxOne.ellipse(x, y, 2, 2, 0, 0, Math.PI * 2);
      // if selected planet is equal to the current planet ID
      if (selectedPlanet === planetId) {
        ctxOne.fillStyle = '#F31B10';
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
    <Wrapper className="App">
      <Header className="row">
        <div className="col-xs-12">
          <h1> space walker </h1>
          <h4>
            {' '}
            created by{' '}
            <a href="https://twitter.com/wesbonneville"> @wesbonneville</a>
          </h4>
          <h4>inspired by Pieter Spronck</h4>
        </div>
      </Header>

      <div className="row center-xs">
        <CurrentStyleCol className="col-xs-4">
          <SystemInfoTitle>System Info</SystemInfoTitle>
          <p>{selectedPlanet && <p>Warp to {selectedPlanet}?</p>}</p>

          <Button onClick={warp}>Warp</Button>
          <p>{player.planetId && <p>Current Planet: {player.planetId}</p>}</p>

          <CurrentStyle>
            <p>
              <strong>X-Coordinate:</strong>
            </p>{' '}
            {currentPlanetData && <p> {currentPlanetData.x}</p>}
          </CurrentStyle>
          <CurrentStyle>
            <strong>
              <p>Y-Coordinate:</p>
            </strong>{' '}
            {currentPlanetData && <p> {currentPlanetData.y}</p>}
          </CurrentStyle>
          <CurrentStyle>
            <strong>
              <p>Tech Level: </p>
            </strong>{' '}
            {currentPlanetData && (
              <p> {TECH_LEVELS[currentPlanetData.techLevel]}</p>
            )}
          </CurrentStyle>
          <CurrentStyle>
            <strong>
              <p>Political System: </p>
            </strong>{' '}
            {currentPlanetData && (
              <p> {POLITICAL_SYSTEMS[currentPlanetData.politicalSystem]}</p>
            )}
          </CurrentStyle>
          <CurrentStyle>
            <strong>
              <p>News: </p>
            </strong>{' '}
            {currentPlanetData && <p> {NEWS[currentPlanetData.news]}</p>}
          </CurrentStyle>
          <MarketTitle>Market</MarketTitle>
          <CurrentStyle>
            {currentPlanetData && (
              <p>
                {Object.keys(currentMarketData).map(key => (
                  <CurrentMarketBtns>
                    <button className="item">{key}</button>
                    <button className="number">{currentMarketData[key]}</button>
                    <button className="buy">Buy</button>
                    <button className="sell">Sell</button>
                  </CurrentMarketBtns>
                ))}
              </p>
            )}{' '}
          </CurrentStyle>
          <ShipsTitle>Available Ships</ShipsTitle>

          {currentPlanetData && (
            <div>
              {currentPlanetData.ships.map(ship => (
                <p key={ship.shipId}>
                  <strong>{ship.displayName}</strong>
                  <br></br>
                  <br></br>
                  Hull Strength: {ship.hullStrength}
                  <br></br>
                  Shield: {ship.shield}
                  <br></br>
                  Fuel: {ship.fuel}
                  <br></br>
                  Cargo Holds: {ship.cargoContainers}
                  <br></br>
                </p>
              ))}
            </div>
          )}
        </CurrentStyleCol>

        <GalacticChartStyles className="col-xs-8">
          <GalacticChart
            id="a"
            onClick={handleCanvasClick}
            ref={canvas}
            width={1200}
            height={600}
          />
          <div className="row">
            <PlayerStyle className="col-xs-4">
              <h4>Player Stats</h4>
              <p>
                <strong>Cash:</strong> {player.person.credits}
              </p>
              <p>
                <strong>Rank:</strong> {player.person.rank}
              </p>
              <p>
                <strong>Experience:</strong> {player.person.experience}
              </p>
              <p>
                <strong>Piloting Skill:</strong> {player.person.pilotSkill}
              </p>
              <p>
                <strong>Fighter Skill:</strong> {player.person.fighterSkill}
              </p>
              <p>
                <strong>Trader Skill:</strong> {player.person.traderSkill}
              </p>
              <p>
                <strong>Engineer Skill:</strong> {player.person.engineerSkill}
              </p>
              <p>
                <strong>Empty Cargo Bays:</strong> {player.person.emptyBays}
              </p>
              {player.status.normal && (
                <p>
                  <strong>Player Status:</strong> Good Standing{' '}
                  {player.status.normal}
                </p>
              )}
            </PlayerStyle>
          </div>
        </GalacticChartStyles>

        {/* <SelectedStyle className="col-xs-4">
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
        </SelectedStyle> */}
      </div>
    </Wrapper>
  );
}

export default App;
