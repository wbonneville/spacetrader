import React, { Component } from 'react';

import styled from 'styled-components';

const Info = styled.div`
  background-color: #e8c223;
  font-family: 'Helvetica Neue';
  & h1 {
    font-size: 120px;
    color: #423e37;
    font-weight: 100;
  }

  & h2 {
    color: #423e37;
    font-weight: 100;
    font-size: 30px;
    margin-bottom: 8%;
  }

  & h4 {
    color: #423e37;
    font-weight: 100;
    font-size: 18px;
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
    margin-bottom: 10%;
  }

  @media (min-width: 150px) and (max-width: 600px) {
    h1 {
      font-size: 60px;
    }
  }
`;

export default class PageInfo extends Component {
  render() {
    return (
      <Info className="row center-xs">
        <div className="col-xs-12">
          <h1>Spacewalker</h1>

          <h2 className="header">Click a planet. Warp. Explore the galaxy!</h2>
          <p>
            Project currently in development by{' '}
            <a href="https://twitter.com/wesbonneville"> @wesbonneville</a>{' '}
          </p>
          <p>inspired by Pieter Spronck</p>
          <p className="margin">
            Made with Flexbox, Styled Components, React, Redux
          </p>
        </div>
      </Info>
    );
  }
}
