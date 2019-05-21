import React, { Fragment } from 'react';

import {
  MessageButton,
  Button,
  FlexItem,
  FlexContainer,
  MessageText,
  ButtonText,
} from '../../pages/homeStyle.js';

const Message = ({
  showing,
  message,
  updateState,
  getRandomMessage,
}) => (
  <FlexContainer
    style={
      showing !== 'reply' ? { height: '75%' } : { height: '90%' }
    }
    flexDirection={'column'}
  >
    <FlexItem
      flexSize={showing !== 'reply' ? 0.4 : 0.4}
      style={{ backgroundColor: 'orange' }}
    >
      Date
    </FlexItem>
    <FlexItem flexSize={3} style={{ backgroundColor: 'lightyellow' }}>
      <MessageText>{message}</MessageText>
    </FlexItem>
    <FlexItem
      flexSize={showing !== 'reply' ? 0.5 : 0.3}
      style={{ backgroundColor: 'lightblue' }}
    >
      <FlexContainer>
        <FlexItem>
          <MessageButton
            onClick={() => {
              getRandomMessage();
            }}
          >
            {showing !== 'reply' ? 'Pass' : 'Nevermind'}
          </MessageButton>
        </FlexItem>
        <FlexItem>
          {showing !== 'reply' ? (
            <MessageButton
              onClick={() => {
                getRandomMessage();
              }}
            >
              Trash
            </MessageButton>
          ) : (
            <Fragment />
          )}
        </FlexItem>
        <FlexItem>
          <MessageButton
            onClick={() => {
              updateState({ showing: 'reply' });
            }}
          >
            Reply
          </MessageButton>
        </FlexItem>
      </FlexContainer>
    </FlexItem>
  </FlexContainer>
);

export default Message;
