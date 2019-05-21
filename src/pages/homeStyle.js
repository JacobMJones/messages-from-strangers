import React, { Component, Fragment } from 'react';

import styled from 'styled-components';
import device from '../constants/devices.js';

export const MessageButton = styled.div`
  border-radius: 2px;
  background-color: white;
  border: solid 1px;
  color: black;
  text-align: center;
  font-family: Raleway;
  font-size: 16px;
  padding: 12px;

  transition: all 0.2s;
  cursor: pointer;
  height: 40%;
  display: inline-block;
`;

export const Button = styled.div`
  @media ${device.mobile} {
    height: 100px;
    width: 100px;
    font-family: Raleway;
    font-size: 1em;
    border-radius: 5px;
    background-color: sienna;
    border: solid 0.1rem;
    cursor: pointer;
    display: inline-block;
    margin-top: 3vh;
    transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transform-origin: center;
    transform: scale(${props => props.size && props.size});
  }
  @media ${device.laptop} {
    height: 30%;
    width: 30%;
    font-family: Raleway;
    font-size: 1em;
    border-radius: 5px;
    background-color: white;
    border: solid 0.1rem;
    cursor: pointer;
    margin: 4vw;
  }
`;

export const FlexItem = styled.div`
  flex: ${props => (props.flexSize ? props.flexSize : 1)};
  text-align: center;
`;
export const FlexContainer = styled.div`
  height: 100%;
  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  align-content: center;
  flex-direction: ${props =>
    props.flexDirection ? props.flexDirection : 'row'};
`;
export const ButtonText = styled.div``;

export const MessageText = styled.div`
  font-family: 'Raleway';
  text-align: center;
  font-size: 2rem;
`;
