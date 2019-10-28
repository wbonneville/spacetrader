import React, { Component } from 'react';
import styled from 'styled-components';

const Top = styled.div`
  box-shadow: 0px 2px 5px #000000;
  background-color: #f6f6f6;
  position: relative;
  z-index: 10;
  color: #423e37;
  font-family: 'HelveticaNeue-CondensedBold';
`;

export default class PageTop extends Component {
  render() {
    return (
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
    );
  }
}
