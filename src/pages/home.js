import React, { Component, Fragment } from 'react';
import { navigate } from 'gatsby';
import { compose } from 'recompose';
import Layout from '../components/layout';
import { withAuthorization } from '../components/Session';
import { withFirebase } from '../components/Firebase';
import * as ROUTES from '../constants/routes';
import styled from 'styled-components';
import device from '../constants/devices.js';
import Message from '../components/Message';
import CreateMessage from '../components/CreateMessage';
import ReadMyMessages from '../components/ReadMyMessages';
import {
  MessageButton,
  Button,
  FlexItem,
  FlexContainer,
  MessageText,
  ButtonText,
} from './homeStyle.js';
import BottomNav from '../components/BottomNav';

class HomePageBase extends Component {
  constructor(props) {
    super(props);
    this.state = { canRender: false };
  }
  componentDidMount() {
    this.setState({ canRender: true });
  }

  updateState = (key, value) => {
    console.log('update state called', key, value);
    this.setState({ [key]: value }, () => {
      console.log(this.state, 'home');
    });
  };

  async getRandomMessage() {
    this.setState({ showing: 'read' });
    let messageCount = await this.props.firebase.getMessageCount();
    await this.props.firebase.getRandomMessage(
      messageCount,
      value => {
        this.props.firebase.getMessageText(value, this.updateState);
      },
    );
    // await this.setState({ showing: 'justSent' });
  }
  render() {
    const { showing } = this.state;
    console.log(this.state.showing);
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
        }}
      >
        <div style={{ height: '100%' }}>
          {this.state.randomMessage && (
            <FlexContainer
              style={
                showing !== 'reply'
                  ? { height: '75%' }
                  : { height: '90%' }
              }
              flexDirection={'column'}
            >
              <FlexItem
                flexSize={showing !== 'reply' ? 0.4 : 0.4}
                style={{ backgroundColor: 'orange' }}
              >
                Date
              </FlexItem>
              <FlexItem
                flexSize={3}
                style={{ backgroundColor: 'lightyellow' }}
              >
                <MessageText>
                  {this.state.randomMessage.text}
                </MessageText>
              </FlexItem>
              <FlexItem
                flexSize={showing !== 'reply' ? 0.5 : 0.3}
                style={{ backgroundColor: 'lightblue' }}
              >
                <FlexContainer>
                  <FlexItem>
                    <MessageButton
                      onClick={() => {
                        this.getRandomMessage();
                      }}
                    >
                      {showing !== 'reply' ? 'Pass' : 'Nevermind'}
                    </MessageButton>
                  </FlexItem>
                  <FlexItem>
                    {showing !== 'reply' ? (
                      <MessageButton
                        onClick={() => {
                          this.getRandomMessage();
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
                        this.setState({ showing: 'reply' });
                      }}
                    >
                      Reply
                    </MessageButton>
                  </FlexItem>
                </FlexContainer>
              </FlexItem>
            </FlexContainer>
          )}
          {this.state.showing === 'write' && <CreateMessage />}
          {this.state.showing === 'chats' && (
            <div>
              <div>
                <h1>Chats</h1>
                <div>none...yet...</div>
              </div>
              <div>
                <h1>Stuff you wrote</h1>
                <ReadMyMessages />
              </div>
            </div>
          )}
        </div>
        {showing !== 'reply' && (
          <div
            style={{
              width: '100vw',
              position: 'fixed',
              top: '85vh',
            }}
            flex={3}
            backgroundColor="lightyellow"
          >
            {/* <div
              style={{
                display: 'flex',
                position: 'absolute',
                bottom: -100,
                left: 0,
                backgroundColor: 'green',
                width: '100vw',
              }}
            > */}
            <BottomNav
              showing={this.state.showing}
              updateState={(key, value) =>
                this.updateState(key, value)
              }
              getRandomMessage={() => this.getRandomMessage()}
            />
          </div>
          // </div>
        )}
      </div>
    );
  }
}

const condition = authUser => !!authUser;
const HomePage = compose(withAuthorization(condition))(
  withFirebase(HomePageBase),
);
export default () => (
  <Layout>
    <HomePage />
  </Layout>
);
