import React, { Component, Fragment } from 'react';
import { withFirebase } from '../Firebase';
import styled from 'styled-components';
import device from '../../constants/devices.js';

const Button = styled.div`
  height: 100%;
  width: 60%;
  font-family: Raleway;
  font-size: 0.4em;
  border-radius: 5px;
  background-color: white;
  border: solid 0.05rem;
  cursor: pointer;
  display: inline-block;
`;

const OutterContainer = styled.div`
  font-family: Raleway;
  font-size: 2.5em;
  display: flex;
  height: 100%;
  flex-direction: column;
`;
const FlexItem = styled.div`
  flex: ${props => (props.flexSize ? props.flexSize : 1)};
`;
const FlexContainer = styled.div`
  display: flex;
`;
class FindMessage extends Component {
  _initFirebase = false;

  constructor(props) {
    super(props);
    this.state = {};
  }

  updateState = (key, value) => {
    this.setState({ [key]: value }, () => {
      console.log(this.state.randomMessage, 'state');
    });
  };

  async getRandomMessage() {
    let messageCount = await this.props.firebase.getMessageCount();
    console.log('message count', messageCount);

    await this.props.firebase.getRandomMessage(
      messageCount,
      value => {
        this.props.firebase.getMessageText(value, this.updateState);
      },
    );
  }

  render() {
    let canShowMessage;
    this.state.randomMessage
      ? (canShowMessage = true)
      : (canShowMessage = false);
    return (
      <OutterContainer>
        <div style={{ flex: 8 }}>
          <div
            style={{
              height: '100%',
              backgroundColor: 'green',
              minHeight: '100%',
              width: '90%',
              marginLeft: '5%',
            }}
          >
            <div
              style={{
                backgroundColor: 'yellow',
                height: '80%',
                maxHeight: '80%',
                minHeight: '80%',
              }}
            >
              {canShowMessage && (
                <div>{this.state.randomMessage.text}</div>
              )}
            </div>
            <div
              style={{
                backgroundColor: 'red',
                height: '20%',
                maxHeight: '20%',
                minHeight: '20%',
              }}
            >
              <FlexContainer>
                <FlexItem>
                  <button>Pass</button>
                </FlexItem>
                <FlexItem>
                  <button>Reply</button>
                </FlexItem>
                <FlexItem>
                  <button>Flag</button>
                </FlexItem>
              </FlexContainer>
            </div>
          </div>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ flex: 1, textAlign: 'center' }}>
          <Button
            onClick={() => {
              this.getRandomMessage();
            }}
          >
            <p> Find a Random Message </p>
          </Button>
        </div>
      </OutterContainer>
    );
  }
}

export default withFirebase(FindMessage);
