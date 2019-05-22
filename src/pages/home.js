import React, { Component, Fragment } from 'react';
import { compose } from 'recompose';
import Layout from '../components/layout';
import { withAuthorization } from '../components/Session';
import { withFirebase } from '../components/Firebase';
import Message from '../components/Message';
import CreateMessage from '../components/CreateMessage';
import ReadMyMessages from '../components/ReadMyMessages';

import BottomNav from '../components/BottomNav';

class HomePageBase extends Component {
  constructor(props) {
    super(props);
    this.state = { canRender: false };
  }
  componentDidMount() {
    this.setState({ canRender: true }, () => {});
  }

  updateState = (key, value) => {
    this.setState({ [key]: value });
  };

  // async getRandomMessage() {
  //   this.setState({ showing: 'read' });
  //   let messageCount = await this.props.firebase.getMessageCount();
  //   await this.props.firebase.getRandomMessage(
  //     messageCount,
  //     value => {
  //       this.props.firebase.getMessageText(value, this.updateState);
  //     },
  //   );
  //   // await this.setState({ showing: 'justSent' });
  // }

  async getRandomMessage() {
    this.setState({ showing: 'read' });
    //  let messageCount = await this.props.firebase.getMessageCount();
    await this.props.firebase.getRandomMessage(
      this.updateState,
      this.props.firebase.auth.O,
    );

    // await this.setState({ showing: 'justSent' });
  }
  replyToMessage() {
    this.props.firebase.replyToMessage(
      this.state.randomMessage.messageId,
      this.state.randomMessage.authorId,
      this.props.firebase.auth.O,
      this.state.randomMessage.text,
      this.state.reply,
    );
  }
  render() {
    const { showing } = this.state;


    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
        }}
      >
        <div style={{ height: '100%' }}>
          {this.state.randomMessage && (
            <Message
              message={this.state.randomMessage}
              getRandomMessage={() => this.getRandomMessage()}
              updateState={(key, value) =>
                this.updateState(key, value)
              }
              showing={this.state.showing}
              reply={() => this.replyToMessage()}
              uid={this.props.firebase.auth.O}
              firebase={this.props.firebase}
            />
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
          <BottomNav
            showing={this.state.showing}
            updateState={(key, value) => this.updateState(key, value)}
            getRandomMessage={() => this.getRandomMessage()}
          />
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
