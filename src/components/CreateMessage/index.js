import React, { Component } from 'react';
import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';

import { navigate } from 'gatsby';
class CreateMessage extends Component {
  _initFirebase = false;

  constructor(props) {
    super(props);

    this.state = {
      text: '',
      loading: false,
      messages: [],
      limit: 5,
    };
  }

  firebaseInit = () => {
    if (this.props.firebase && !this._initFirebase) {
      this._initFirebase = true;
    }
  };

  componentDidMount() {
    // this.firebaseInit();
  }

  componentDidUpdate() {
    // this.firebaseInit();
  }

  componentWillUnmount() {
    // this.props.firebase.messages().off();
  }

  onChangeText = event => {
    this.setState({ text: event.target.value });
  };

  async onCreateMessage(event, authUser) {
    this.props.firebase.messages().push({
      text: this.state.text,
      userId: authUser.uid,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
    });
    this.setState({text:''})
    event.preventDefault();
  }

  onEditMessage = (message, text) => {
    const { uid, ...messageSnapshot } = message;

    this.props.firebase.message(message.uid).set({
      ...messageSnapshot,
      text,
      editedAt: this.props.firebase.serverValue.TIMESTAMP,
    });
  };

  onRemoveMessage = uid => {
    this.props.firebase.message(uid).remove();
  };

  onGetRandomMessage = () => {
    this.props.firebase.getRandomMessage();
  };

  render() {
    const { text, messages, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            <form
              onSubmit={event =>
                this.onCreateMessage(event, authUser)
              }
            >
              <input
                type="text"
                value={text}
                onChange={this.onChangeText}
              />

              <button type="submit">Send</button>
            </form>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(CreateMessage);
