import React, { Component } from 'react';
import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';

class FindMessage extends Component {
  _initFirebase = false;

  constructor(props) {
    super(props);

    this.state = {};
  }

  firebaseInit = () => {
    if (this.props.firebase && !this._initFirebase) {
      this._initFirebase = true;
    }
  };

  componentDidMount() {
    this.firebaseInit();
  }

  componentDidUpdate() {
    this.firebaseInit();
  }

  updateState = (key, value) => {
    this.setState({ [key]: value }, () => {
      console.log(this.state, 'state');
    });
  };

  async getRandomMessage() {
    let messageCount = await this.props.firebase.getMessageCount()
   console.log('message count', messageCount)

 
   

    await this.props.firebase.getRandomMessage(messageCount,(value) => {
      this.props.firebase.getMessageText(value, this.updateState);
    });
  }

  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            <button
              onClick={() => {
                this.getRandomMessage();
              }}
            >
              Find a Random Message
    
            </button>
            {this.state.randomMessageText}
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(FindMessage);
