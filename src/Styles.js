import styled from 'styled-components';

export const GalacticChart = styled.canvas`
  background-color: white;
  width: 1000px;
  height: 370px;
`;

export const Button = styled.button`
  margin-top: 7%;
  padding: 10px;
  font-size: 14px;
  width: 100px;
  background-color: #171a21;
  color: white;
  border: 1px solid white;
  text-transform: uppercase;
`;

export const Container = styled.div`
  font-family: 'Helvetica Neue';
  overflow-x: hidden;
`;

export const Box = styled.div`
  align-items: flex-start;
`;

export const BoxTwo = styled.div``;

export const CurrentSystem = styled.div`
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

export const TargetCargo = styled.div`
  background-color: #171a21;
  text-align: left;
  color: white;
  font-size: 14px;
`;

export const Chart = styled.div`
  background-color: white;
  color: white;
  margin-top: -170px;
  color: #423e37;
  font-family: 'HelveticaNeue-CondensedBold';
`;

export const Shipyard = styled.div`
  background-color: #171a21;
  margin-top: -160px;
  color: white;
  font-family: 'HelveticaNeue-CondensedBold';
`;

export const Ex = styled.div`
  background-color: #b79300;
  box-shadow: 0px 1px 4px #000000;
  position: relative;
  z-index: 1;
  color: #423e37;
  font-family: 'HelveticaNeue-CondensedBold';
`;

export const ExTwo = styled.div`
  background-color: #b79300;
  box-shadow: 0px 1px 4px #000000;
  position: relative;
  z-index: 1;
  color: #423e37;
  font-family: 'HelveticaNeue-CondensedBold';
`;

export const Stats = styled.div`
  background-color: #e8c223;
  color: #423e37;
  font-family: 'HelveticaNeue-CondensedBold';
`;

export const White = styled.div`
  background-color: white;
  box-shadow: 0px 2px 4px #000000;
  position: relative;
  z-index: 2;
  color: #423e37;
  font-family: 'HelveticaNeue-CondensedBold';
  text-align: center;
`;

export const AmtBtn = styled.button`
  background-color: #171a21;
  color: white;
  border: 1px solid #ffa3a3;
  font-size: 12px;
  padding: 3px;
  padding-left: 10px;
  padding-right: 10px;
`;
export const AllBtn = styled.button`
  background-color: #171a21;
  color: white;
  border: 1px solid white;
  font-size: 12px;
  padding: 3px;
  padding-left: 16px;
  padding-right: 16px;
  margin-right: 4%;
`;

export const CargoRowStyle = styled.div`
  font-size: 12px;
  height: 460px;
`;

export const Price = styled.div`
  & p {
    font-size: 12px;
    padding-bottom: 1.9%;
  }
`;
