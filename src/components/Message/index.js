import React, { Fragment } from 'react';

import {
  MessageButton,
  Button,
  FlexItem,
  FlexContainer,
  MessageText,
  ButtonText,
} from '../../pages/homeStyle.js';

const submitFormHandler = event => {
  event.preventDefault();
};

const Message = props => (
  <FlexContainer
    style={
      props.showing !== 'reply'
        ? {
            height: '75%',
          }
        : {
            height: '90%',
          }
    }
    flexDirection={'column'}
  >
    <FlexItem
      flexSize={props.showing !== 'reply' ? 0.4 : 0.4}
      style={{
        backgroundColor: 'orange',
      }}
    >
      Date
    </FlexItem>
    <FlexItem
      flexSize={3}
      style={{
        backgroundColor: 'lightyellow',
      }}
    >
      <MessageText>{props.message.text}</MessageText>
    </FlexItem>
    {props.showing === 'reply' && (
      <FlexItem>
        <input
          style={{
            fontSize: '16px',
            height: '100%',
            width: '50%',
            textAlign: 'center',
          }}
          type="text"
          placeholder="..."
          onChange={e => {
            props.updateState('reply', e.target.value);
          }}
        />
      </FlexItem>
    )}
    <FlexItem
      flexSize={props.showing !== 'reply' ? 0.5 : 0.3}
      style={{
        backgroundColor: 'lightblue',
      }}
    >
      <FlexContainer>
        <FlexItem>
          <MessageButton
            onClick={() => {
              
               props.firebase.passMessage(props.message.messageId, props.uid);
            }}
          >
            {props.showing !== 'reply' ? 'Pass' : 'Nevermind'}
          </MessageButton>
        </FlexItem>
        <FlexItem>
          {props.showing !== 'reply' ? (
            <MessageButton
              onClick={() => {
                props.getRandomMessage();
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
            onClick={
              props.showing !== 'reply'
                ? () => {
                
                    props.updateState('showing', 'reply');
                  }
                : () => {
                    props.reply(
                      props.message.messageId,
                      props.message.authorId,
                      props.uid,
                    );
                  }
            }
          >
            Reply
          </MessageButton>
        </FlexItem>
      </FlexContainer>
    </FlexItem>
  </FlexContainer>
);
export default Message;
