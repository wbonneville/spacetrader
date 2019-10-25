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

const GalacticChart = styled.canvas`
  background-color: white;
  width: 800px;
  height: 370px;
  margin-left: -5%;
`;

const Button = styled.button`
  margin-top: 7%;
  padding: 10px;
  font-size: 14px;
  width: 100px;
  background-color: #171a21;
  color: white;
  border: 1px solid white;
  text-transform: uppercase;
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
  padding-top: 2%;
  padding-left: 3%;
  font-size: 20px;
  background-color: #6a7173;
  z-index: 1;
  color: white;
  font-family: 'Helvetica Neue';
  padding-bottom: 3%;
  /* padding-bottom: 10%; */

  & p {
    font-weight: 300;
    margin-bottom: -1px;
    display: inline-block;
  }
`;

const TargetCargo = styled.div`
  background-color: #171a21;
  text-align: left;
  color: white;
  font-size: 14px;
`;

const Chart = styled.div`
  background-color: white;
  color: white;
  margin-top: -170px;
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
  font-size: 12px;
  padding: 3px;
  padding-left: 10px;
  padding-right: 10px;
`;
const AllBtn = styled.button`
  background-color: #171a21;
  color: white;
  border: 1px solid white;
  font-size: 12px;
  padding: 3px;
  padding-left: 16px;
  padding-right: 16px;
  margin-right: 4%;
`;

const CargoRowStyle = styled.div`
  font-size: 12px;
  height: 460px;
`;

const Price = styled.div`
  & p {
    font-size: 12px;
    padding-bottom: 1.9%;
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

  const Info = styled.div`
    background-color: #e8c223;

    & h1 {
      font-size: 100px;
      color: black;
      font-weight: 100;
      font-family: 'Helvetica Neue';
    }

    & h2 {
      color: black;
      font-weight: 100;
      font-size: 30px;
      margin-bottom: 8%;
    }

    & h4 {
      color: black;
      font-weight: 100;
      font-size: 18px;
      color: black;
    }

    & .header {
      font-weight: 200;
      font-size: 30px;
    }

    & p {
      font-size: 14px;

      font-weight: 100;
      opacity: 0.5;
      & a {
        color: inherit;
      }
    }
    .margin {
      margin-bottom: 20%;
    }
  `;

  return (
    <React.Fragment>
      <Container>
        <Info className="row center-xs">
          <div className="col-xs-8">
            <h1>Spacewalker</h1>

            <h2 className="header">
              Click a planet. Warp. Explore the galaxy!
            </h2>
            <p>
              Project currently in development by{' '}
              <a href="https://twitter.com/wesbonneville"> @wesbonneville</a>{' '}
            </p>
            <p className="margin">
              Made with Flexbox, Styled Components, React, Redux
            </p>
          </div>
        </Info>
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
            <p>
              Name:{' '}
              {currentPlanetData && (
                <span> {currentPlanetData.planetName}</span>
              )}
            </p>
            <br></br>
            <p>Size:</p>
            <br></br>
            <p>Resource:</p>
            <br></br>
            <p>
              x:
              {currentPlanetData && <span> {currentPlanetData.x}</span>}
            </p>
            <br></br>
            <p>
              y:
              {currentPlanetData && <span> {currentPlanetData.y}</span>}
            </p>
            <br></br>
            <p>
              Tech Level:{' '}
              {currentPlanetData && (
                <span> {TECH_LEVELS[currentPlanetData.techLevel]}</span>
              )}
            </p>
            <br></br>
            <p>
              Political System:{' '}
              {currentPlanetData && (
                <span>
                  {' '}
                  {POLITICAL_SYSTEMS[currentPlanetData.politicalSystem]}
                </span>
              )}
            </p>
            <br></br>
            <p>News:</p>
            <br></br>
            <p>Pirates:</p>
            <br></br>
            <p>Police:</p>
            <br></br>
            <p></p>
          </CurrentSystem>

          <TargetCargo className="col-xs-6">
            <div className="row center-xs">
              <div className="col-xs-4">
                <h4>Sell</h4>
              </div>
              <div className="col-xs-4">
                <h4>Buy</h4>
              </div>
              <div className="col-xs-4">
                <h4>Price</h4>
              </div>
            </div>
            <CargoRowStyle className="row center-xs">
              <div className="col-xs-4">
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
              </div>
              <div className="col-xs-4">
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
              <Price className="col-xs-4">
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
            <p>
              Name:{' '}
              {selectedPlanet && <span> {selectedPlanetData.planetName}</span>}
            </p>
            <br></br>
            <p>Size</p>
            <br></br>
            <p>Resource:</p>
            <br></br>
            <p>
              x:
              {selectedPlanetData && <span> {selectedPlanetData.x}</span>}
            </p>
            <br></br>
            <p>
              y:
              {selectedPlanetData && <span> {selectedPlanetData.y}</span>}
            </p>
            <br></br>
            <p>
              Tech Level:{' '}
              {selectedPlanetData && (
                <span> {TECH_LEVELS[selectedPlanetData.techLevel]}</span>
              )}
            </p>
            <br></br>
            <p>
              Political System:{' '}
              {selectedPlanetData && (
                <span>
                  {' '}
                  {POLITICAL_SYSTEMS[selectedPlanetData.politicalSystem]}
                </span>
              )}
            </p>
            <br></br>
            <p>News:</p>
            <br></br>
            <p>Pirates:</p>
            <br></br>
            <p>Police:</p>
            <br></br>
            <p></p>
          </CurrentSystem>
        </Box>
        <div className="row between-xs">
          <White className="col-xs-3">
            {' '}
            <h2>Dock</h2>
          </White>
          <White className="col-xs-3">
            {' '}
            <h2>Cargo Bays</h2>
          </White>
        </div>
        <BoxTwo className="row center-xs">
          <Ex className="col-xs-3">
            <h1>Fuel </h1>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
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
            <h1>0 / 15 </h1>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
          </ExTwo>
        </BoxTwo>

        <BoxTwo className="row center-xs">
          <Shipyard className="col-xs-8">
            <Button onClick={warp}>Warp</Button>
          </Shipyard>
        </BoxTwo>
        <Stats className="row center-xs">
          <div className="col-xs-2">
            <h4>
              {' '}
              <strong>XP:</strong> {player.experience}
            </h4>
          </div>
          <div className="col-xs-2">
            <h4>
              <strong>Cash:</strong> {player.credits}
            </h4>
          </div>
          <div className="col-xs-2">
            <h4>Current Costs: 0</h4>
          </div>
          <div className="col-xs-2">
            <h4>
              <strong>Rank:</strong> {player.rank}
            </h4>
          </div>

          <div className="col-xs-2">
            {player.status.normal && (
              <h4>
                <strong>Status:</strong> Good Standing {player.status.normal}
              </h4>
            )}
          </div>
        </Stats>
      </Container>
      {/* <Wrapper className="App">
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

            <p></p>
            <p></p>
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
          <PlayerShipsStyle className="col-xs-3">
          <p>Player Ship Added Soon</p>
        </PlayerShipsStyle>
        </PlayerStyleWrapper>

        <div className="row start-xs">
          <SelectedStyle className="col-xs-4">
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
        </SelectedStyle>
        </div>
      </Wrapper> */}
    </React.Fragment>
  );
}

export default App;
