import React, { Component, Fragment } from 'react';
import {
  MessageButton,
  Button,
  FlexItem,
  FlexContainer,
  MessageText,
  ButtonText,
} from '../../pages/homeStyle.js';

const BottomNav = props => (
  <FlexContainer
    style={{
      marginRight: '12px',
    }}
  >
    <FlexItem>
      <Button
        style={{
          position: 'relative',
          bottom: '150px',
          height: 200,
        }}
        size={props.showing === 'write' ? 1.2 : 0.9}
        onClick={() => {
          console.log('write clicked');
          props.showing !== 'write' &&
            props.updateState('showing', 'write');
          props.updateState('randomMessage', null);
          //   props.updateState('randomMessage', null);
        }}
      >
        <ButtonText>Write</ButtonText>
      </Button>
    </FlexItem>
    <FlexItem>
      <Button
        style={{
          position: 'relative',
          bottom: '150px',
          height: 200,
        }}
        size={props.showing === 'read' ? 1.2 : 0.9}
        onClick={() => {
          props.getRandomMessage();
        }}
      >
        <ButtonText>Read</ButtonText>
      </Button>
    </FlexItem>
    <FlexItem>
      <Button
        style={{
          position: 'relative',
          bottom: '150px',
          height: 200,
        }}
        size={props.showing === 'chats' ? 1.2 : 0.9}
        onClick={() => {
          props.updateState('showing', 'chats');
          props.updateState('randomMessage', null);
        }}
      >
        <ButtonText>Chats</ButtonText>
      </Button>
    </FlexItem>
  </FlexContainer>
);
export default BottomNav;
