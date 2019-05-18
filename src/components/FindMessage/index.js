import React, { Component } from 'react';
import { withFirebase } from '../Firebase';

class FindMessage extends Component {
  _initFirebase = false;

  constructor(props) {
    super(props);
    this.state = {};
  }

  updateState = (key, value) => {
    this.setState({ [key]: value }, () => {
      console.log(this.state, 'state');
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
    return (
      <div style={{ fontFamily: 'Raleway', fontSize: '1.5em' }}>
        {this.state.randomMessageText}
        <button
          onClick={() => {
            this.getRandomMessage();
          }}
        >
          Find a Random Message
        </button>
      </div>
    );
  }
}

export default withFirebase(FindMessage);
