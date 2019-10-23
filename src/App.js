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
import { addPlayerXP } from './redux/increaseXP.action';

import generatePlanet from './generatePlanet';

// components

import Rarity from './rarity';
import { realpath } from 'fs';

const Wrapper = styled.div`
  font-family: 'Helvetica Neue';
  margin-left: 3.5%;
  margin-right: 3.5%;
`;

const Header = styled.div`
  margin-bottom: 8%;
  & h1 {
    font-family: 'Helvetica Neue';
    font-size: 65px;
    color: white;
    letter-spacing: 2px;
    font-weight: 100;
  }
  & a {
    color: salmon;
    font-weight: 100;
    text-decoration: underline;
  }
  & h4 {
    color: white;
    font-weight: 100;
    opacity: 0.6;
  }
  & h3 {
    margin-top: -2rem;
    color: white;
    font-weight: 300;
  }
`;

// const CurrentStyleRow = styled.div`
//   color: white;
// `;

const GalacticChart = styled.canvas`
  background-color: white;
  width: 800px;
  height: 370px;
  margin-left: -5%;
`;

const GalacticChartStyles = styled.div`
  & h1 {
    color: white;
  }
`;

const CurrentStyleCol = styled.div`
  text-align: left;
  padding-top: 1%;
  padding-left: 3%;
  background-color: rgb(16, 16, 16);
  border: 1px solid white;
  color: white;
  margin-bottom: 5%;
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

const PlayerStyleWrapper = styled.div``;

const PlayerStyle = styled.div`
  text-align: left;
  background-color: rgb(16, 16, 16);
  padding-top: 1%;
  padding-bottom: 2%;
  padding-left: 3%;
  border: 1px solid white;

  color: white;
  & p {
    font-size: 14px;
  }
`;

const PlayerShipsStyle = styled.div`
  text-align: left;
  background-color: rgb(16, 16, 16);
  padding-top: 2%;
  padding-bottom: 2%;
  padding-left: 5%;
  border: 1px solid white;

  margin-top: 5%;
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

  & p {
    font-size: 46px;
  }
`;

const Container = styled.div``;

const Top = styled.div`
  box-shadow: 0px 2px 5px #000000;
  position: relative;
  z-index: 10;
  color: #423e37;
  font-family: 'HelveticaNeue-CondensedBold';
`;

const Box = styled.div`
  align-items: flex-start;
`;

const BoxTwo = styled.div``;

const CurrentSystem = styled.div`
  padding-left: 3%;
  font-size: 20px;
  background-color: #617073;
  z-index: 1;
  color: white;
  font-family: 'Helvetica Neue';

  /* padding-bottom: 10%; */

  & p {
    font-weight: 300;
    margin-bottom: 30px;
  }
`;

const TargetCargo = styled.div`
  background-color: #171a21;
  text-align: center;
  color: white;
  font-size: 18px;
`;

const Chart = styled.div`
  border: 3px solid black;
  background-color: white;
  color: white;
  margin-top: -200px;
  color: #423e37;
  font-family: 'HelveticaNeue-CondensedBold';
`;

const Shipyard = styled.div`
  background-color: #171a21;
  margin-top: -160px;
  color: white;
  font-family: 'HelveticaNeue-CondensedBold';
`;

const Ex = styled.div`
  background-color: #b79300;
  box-shadow: 0px 1px 4px #000000;
  position: relative;
  z-index: 1;
  color: #423e37;
  font-family: 'HelveticaNeue-CondensedBold';
`;

const ExTwo = styled.div`
  background-color: #b79300;
  box-shadow: 0px 1px 4px #000000;
  position: relative;
  z-index: 1;
  color: #423e37;
  font-family: 'HelveticaNeue-CondensedBold';
`;

const Stats = styled.div`
  background-color: #e8c223;
  color: #423e37;
  font-family: 'HelveticaNeue-CondensedBold';
`;

const White = styled.div`
  background-color: white;
  box-shadow: 0px 2px 4px #000000;
  position: relative;
  z-index: 2;
  color: #423e37;
  font-family: 'HelveticaNeue-CondensedBold';
  text-align: center;
`;

const AmtBtn = styled.button`
  background-color: #171a21;
  color: white;
  border: 1px solid #ffa3a3;
  font-size: 14px;
  padding: 3px;
  padding-left: 10px;
  padding-right: 10px;
`;
const AllBtn = styled.button`
  background-color: #171a21;
  color: white;
  border: 1px solid white;
  font-size: 14px;
  padding: 3px;
  padding-left: 16px;
  padding-right: 16px;
  margin-right: 4%;
`;

const CargoRowStyle = styled.div`
  margin-top: -2%;
  margin-bottom: 2%;
  & p {
    font-size: 16px;
    margin-bottom: -1%;
  }
`;

const Price = styled.div`
  & p {
    font-size: 16px;
    margin-bottom: -1%;
  }
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
    for (var i = 0; i < 800; i++) {
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
        ctxOne.fillStyle = 'black';
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
    dispatch(addPlayerXP(5));
  };

  function PlanetName(props) {
    return (
      <p>
        {props.color}
        {currentPlanetData.planetName}
      </p>
    );
  }

  return (
    <React.Fragment>
      <Container>
        <Top className="row center-xs space-between">
          <div className="col-xs-3">
            <h1>System Info</h1>
          </div>
          <div className="col-xs-3">
            <h1>Cargo</h1>
          </div>
          <div className="col-xs-3">
            <h1>Target Price</h1>
          </div>
          <div className="col-xs-3">
            <h1>Target System</h1>
          </div>
        </Top>
        <Box className="row">
          <CurrentSystem className="col-xs-3">
            <p>Name</p>
            <p>Size</p>
            <p>Resource:</p>
            <p>X:</p>
            <p>Y: </p>
            <p>Tech Level:</p>
            <p>Political System:</p>
            <p>News:</p>
            <p>Pirates:</p>
            <p>Police:</p>
          </CurrentSystem>

          <TargetCargo className="col-xs-6">
            <div className="row center-xs">
              <div className="col-xs-5">
                <h4>Sell</h4>
              </div>
              <div className="col-xs-5">
                <h4>Buy</h4>
              </div>
              <div className="col-xs-2">
                <h4>Price</h4>
              </div>
            </div>
            <CargoRowStyle className="row center-xs">
              <div className="col-xs-5">
                {currentPlanetData && (
                  <p>
                    {Object.keys(currentMarketData).map(key => (
                      <p className="item">
                        {key}
                        &nbsp; &nbsp;
                        <AmtBtn>{currentMarketData[key]}</AmtBtn>
                        &nbsp;
                        <AllBtn>All</AllBtn>{' '}
                      </p>
                    ))}
                  </p>
                )}

                {/* <div>
                  <p>Food</p>
                  {currentPlanetData && (
                    <p>
                      {Object.keys(currentMarketData).map(key => (
                        <p className="item">
                          &nbsp; &nbsp;
                          <AmtBtn>{currentMarketData[key]}</AmtBtn>
                          &nbsp;
                          <AllBtn>All</AllBtn>{' '}
                        </p>
                      ))}
                    </p>
                  )}
                </div> */}
              </div>
              <div className="col-xs-5">
                {selectedPlanetData && (
                  <p>
                    {Object.keys(selectedMarketData).map(key => (
                      <p className="item">
                        {key}
                        &nbsp; &nbsp;
                        <AmtBtn>{selectedMarketData[key]}</AmtBtn>
                        &nbsp;
                        <AllBtn>All</AllBtn>{' '}
                      </p>
                    ))}
                  </p>
                )}
              </div>
              <Price className="col-xs-2">
                <p>%</p>
                <p>%</p>
                <p>%</p>
                <p>%</p>
                <p>%</p>
                <p>%</p>
                <p>%</p>
                <p>%</p>
                <p>%</p>
                <p>%</p>
                <p>%</p>
              </Price>
            </CargoRowStyle>
          </TargetCargo>
          <CurrentSystem className="col-xs-3">
            <p>Name</p>
            <p>Size</p>
            <p>Resource:</p>
            <p>X:</p>
            <p>Y: </p>
            <p>Tech Level:</p>
            <p>Political System:</p>
            <p>News:</p>
            <p>Pirates:</p>
            <p>Police:</p>
          </CurrentSystem>
        </Box>
        <div className="row between-xs">
          <White className="col-xs-3">
            {' '}
            <h2>hi</h2>
          </White>
          <White className="col-xs-3">
            {' '}
            <h2>hi</h2>
          </White>
        </div>
        <BoxTwo className="row center-xs">
          <Ex className="col-xs-3">
            <h1>hi</h1>
            <h1>hi</h1>
            <h1>hi</h1>
            <h1>hi</h1>
            <h1>hi</h1>
          </Ex>
          <Chart className="col-xs-6">
            <GalacticChart
              id="a"
              onClick={handleCanvasClick}
              ref={canvas}
              width={1600}
              height={740}
            />
          </Chart>

          <ExTwo className="col-xs-3">
            <h1>hi</h1>
            <h1>hi</h1>
            <h1>hi</h1>
            <h1>hi</h1>
            <h1>hi</h1>
          </ExTwo>
        </BoxTwo>

        <BoxTwo className="row center-xs">
          <Shipyard className="col-xs-8">
            <h1>Shipyard</h1>
            <p>Ships</p>
            <p>Ships</p>
          </Shipyard>
        </BoxTwo>
        <Stats className="row center-xs">
          <div className="col-xs-2">
            <h4>good</h4>
          </div>
          <div className="col-xs-2">
            <h4>good</h4>
          </div>
          <div className="col-xs-2">
            <h4>good</h4>
          </div>
          <div className="col-xs-2">
            <h4>good</h4>
          </div>
          <div className="col-xs-2">
            <h4>good</h4>
          </div>
        </Stats>
      </Container>
      <Wrapper className="App">
        <Header className="row">
          <div className="col-xs-12">
            <h1> space walker (WIP) </h1>
            <h3>click a planet</h3>
            <h4>
              {' '}
              created by{' '}
              <a href="https://twitter.com/wesbonneville"> @wesbonneville</a>
            </h4>
            <h4>inspired by Pieter Spronck</h4>
          </div>
        </Header>
        <PlayerStyleWrapper className="row center-xs">
          <PlayerStyle className="col-xs-3">
            <h4>Player Stats</h4>
            <p>
              <strong>Cash:</strong> {player.credits}
            </p>
            <p>
              <strong>Rank:</strong> {player.rank}
            </p>
            <p>
              <strong>Experience:</strong> {player.experience}
            </p>
            <p>
              <strong>Piloting Skill:</strong> {player.pilotSkill}
            </p>
            <p>
              <strong>Fighter Skill:</strong> {player.fighterSkill}
            </p>
            <p>
              <strong>Trader Skill:</strong> {player.traderSkill}
            </p>
            <p>
              <strong>Engineer Skill:</strong> {player.engineerSkill}
            </p>
            <p>
              <strong>Empty Cargo Bays:</strong> {player.emptyBays}
            </p>
            {player.status.normal && (
              <p>
                <strong>Player Status:</strong> Good Standing{' '}
                {player.status.normal}
              </p>
            )}
          </PlayerStyle>
          <CurrentStyleCol className="col-xs-12 col-sm-3">
            <SystemInfoTitle>
              System Info:
              <p>
                {currentPlanetData && (
                  <p className="planetNameStyle">
                    {' '}
                    <PlanetName />
                  </p>
                )}
              </p>
            </SystemInfoTitle>
            <p>
              {selectedPlanet && (
                <p>Warp to {selectedPlanetData.planetName}?</p>
              )}
            </p>

            <Button onClick={warp}>Warp</Button>
            <p>{player.planetId && <p>Identification: {player.planetId}</p>}</p>

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
                      <button className="number">
                        {currentMarketData[key]}
                      </button>
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
          <GalacticChartStyles className="col-xs-4"></GalacticChartStyles>
          {/* <PlayerShipsStyle className="col-xs-3">
          <p>Player Ship Added Soon</p>
        </PlayerShipsStyle> */}
        </PlayerStyleWrapper>

        <div className="row start-xs">
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
    </React.Fragment>
  );
}

export default App;
