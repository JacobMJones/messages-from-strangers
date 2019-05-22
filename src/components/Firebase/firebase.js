const firebaseConfig = {
  apiKey: process.env.GATSBY_API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

class Firebase {
  constructor(app) {
    if (!app.apps.length) {
      app.initializeApp(firebaseConfig);
    }
    /* Helper */

    this.serverValue = app.database.ServerValue;
    this.emailAuthProvider = app.auth.EmailAuthProvider;

    /* Firebase APIs */

    this.auth = app.auth();
    this.db = app.database();

    /* Social Sign In Method Provider */

    this.googleProvider = new app.auth.GoogleAuthProvider();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(
      `${email}@messagesfromstrangers.com`,
      password,
    );

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(
      `${email}@messagesfromstrangers.com`,
      password,
    );

  doSignInWithGoogle = () =>
    this.auth.signInWithPopup(this.googleProvider);

  doSignOut = () => {
    this.auth.signOut();
  };

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    });

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val();

            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = {};
            }

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

  // *** User API ***

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

  // *** Message API ***

  message = uid => this.db.ref(`messages/${uid}`);

  getMessageText = (mid, index, cb, uid) => {
    this.db
      .ref(`messages/${mid}`)
      .once('value')
      .then(snapshot => {
        if (snapshot.val().userId !== uid) {
          cb('randomMessage', {
            text: snapshot.val().text,
            index: snapshot.val().index,
            authorId: snapshot.val().userId,
            messageId: uid,
          });
        } else {
          this.getRandomMessage(this.getMessageText(), index + 1);
        }
      });
  };
  replyToMessage = (
    messageId,
    authorUid,
    respondentUid,
    message,
    reply,
  ) => {
    console.log(
      'reply',
      messageId,
      authorUid,
      respondentUid,
      message,
      reply,
    );

    this.db.ref('threads/' + messageId).set({
      threadStarter: authorUid,
      threadResponder: respondentUid,
      messages: [
        { text: message, uid: authorUid },
        { text: reply, uid: respondentUid },
      ],
    });
    this.db.ref(`messages/${messageId}`).update({ available: false });
  };

  filteredMessages = uid =>
    this.db
      .ref('messages')
      .orderByChild('userId')
      .equalTo(uid);

  messages = () => this.db.ref('messages');

  getAllMessages = () => this.db.ref('messages');

  passMessage = (mid, uid) => {
    console.log('pass on message', mid, uid);
    this.db
      .ref(`/messages/${mid}`)
      .child(`passedUsers`)
      .update({ [uid]: uid });
  };

  getRandomMessage(cb, uid) {
    console.log('in get random', cb, uid);
    let done = false;
let canUse = false;
    this.db
      .ref('messages')
      .orderByChild('createdAt')
      .limitToFirst(12)
      .once('value', snapshot => {
        for (let key in snapshot.val()) {
          this.db
            .ref(`messages/${key}`)
            .once('value')
            .then(snapshot => {
              if (snapshot.val().userId !== uid && !done) {
                console.log('key2', key, done);
                if (snapshot.val().passedUsers) {
                  canUse = true;
                  for (var userId in snapshot.val().passedUsers) {
                  
                    if(userId === uid){
                      canUse = false;
                    }
                  
                  }

                    if (canUse && !done) {
                      console.log('in top');
                      cb('randomMessage', {
                        text: snapshot.val().text,
                        index: snapshot.val().index,
                        authorId: snapshot.val().userId,
                        messageId: key,
                      });
                      done = true;
                    
                    }
                  
                } else if (!done) {
                  console.log('in bottom');
                  cb('randomMessage', {
                    text: snapshot.val().text,
                    index: snapshot.val().index,
                    authorId: snapshot.val().userId,
                    messageId: key,
                  });
                  done = true;
                }
              }
            });
        }
      });

    //      this.db
    //      .ref(`messages/${key}`)
    //      .once('value')
    //      .then(snapshot => {
    //        (cb)('randomMessage', {
    //          text: snapshot.val().text,
    //          index: snapshot.val().index,
    //          authorId: snapshot.val().userId,
    //          messageId: uid,
    //        });
    //      });

    //       console.log('snapshot key' + key);
    //       console.log('snapshot.val.text = ' + snapshot.val().text);
    //       console.log('snapshot.val' + snapshot.val()[key]);
    // nextUrl = snapshot.val()[key].url;
    //   }
    // });

    // this.db
    // .ref(`messages/${key}`)
    // .once('value')
    // .then(snapshot => {
    //   cb('randomMessage', {
    //     text: snapshot.val().text,
    //     index: snapshot.val().index,
    //     authorId: snapshot.val().userId,
    //     messageId: uid,
    //   });
    // });
  }
}

let firebase;

function getFirebase(app, auth, database) {
  if (!firebase) {
    firebase = new Firebase(app, auth, database);
  }

  return firebase;
}

export default getFirebase;
