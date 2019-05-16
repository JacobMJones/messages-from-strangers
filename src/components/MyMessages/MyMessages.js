import React, { Component } from 'react';
import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import MessageList from './MyMessageList';
import { navigate } from 'gatsby';
class Messages extends Component {
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

     setTimeout(()=>{this.onListenForMessages()}, 100);
    }
  };

  componentDidMount() {
    this.firebaseInit();
  }

  componentDidUpdate() {
   this.firebaseInit();
    
  }

  onListenForMessages = () => {
    this.setState({ loading: true });
    if (this.props.firebase != null) {
      this.props.firebase
        .filteredMessages(
          JSON.parse(localStorage.getItem('authUser')).uid,
        )
        // .orderByChild('createdAt')
        .limitToLast(this.state.limit)
        .on('value', snapshot => {
          const messageObject = snapshot.val();

          if (messageObject) {
            const messageList = Object.keys(messageObject).map(
              key => ({
                ...messageObject[key],
                uid: key,
              }),
            );

            this.setState({
              messages: messageList,
              loading: false,
            });
          } else {
            this.setState({ messages: null, loading: false });
          }
        });
    }
  };

  componentWillUnmount() {
    this.props.firebase.messages().off();
  }

  onChangeText = event => {
    this.setState({ text: event.target.value });
  };

  async onCreateMessage(event, authUser) {
    let currentCount = await this.props.firebase.db
      .ref('messages/messagesInfo')
      .once('value')
      .then(snapshot => {
        return snapshot.val().messagesCount;
      });

    this.props.firebase.messages().push({
      index: currentCount + 1,
      text: this.state.text,
      userId: authUser.uid,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
    });
    this.props.firebase.incrementMessageCount(+1);
    this.setState({ text: '' });
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

  // onNextPage = () => {
  //   this.setState(
  //     state => ({ limit: state.limit + 5 }),
  //     this.onListenForMessages,
  //   );
  // };

  render() {
    const { text, messages, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {/* {!loading && messages && (
              <button type="button" onClick={this.onNextPage}>
                More
              </button>
            )} */}

            {loading && <div>Loading ...</div>}

            {messages && (
              <MessageList
                authUser={authUser}
                messages={messages}
                onEditMessage={this.onEditMessage}
                onRemoveMessage={this.onRemoveMessage}
              />
            )}

            {!messages && <div>There are no messages ...</div>}

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
              <button type="submit">Sendd</button>
              asd
            </form>
         
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(Messages);
