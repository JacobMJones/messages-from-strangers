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
    this.facebookProvider = new app.auth.FacebookAuthProvider();
    this.twitterProvider = new app.auth.TwitterAuthProvider();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithGoogle = () =>
    this.auth.signInWithPopup(this.googleProvider);

  doSignInWithFacebook = () =>
    this.auth.signInWithPopup(this.facebookProvider);

  doSignInWithTwitter = () =>
    this.auth.signInWithPopup(this.twitterProvider);

  doSignOut = () => this.auth.signOut();

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

  async getMessageCount() {
    let num = await this.db
      .ref('messages/messagesInfo')
      .once('value')
      .then(snapshot => {
        return snapshot.val().messagesCount;
      });
      return num
  }
  incrementMessageCount = (num) => {
    console.log('increment');

    this.db
      .ref('messages/messagesInfo')
      .once('value')
      .then(snapshot => {
        let currentCount = snapshot.val().messagesCount;
        this.db
          .ref('messages/messagesInfo')
          .update({ messagesCount: currentCount + num });
      });
  };
  message = uid => this.db.ref(`messages/${uid}`);

  getMessageText = (uid, cb) => {
    this.db
      .ref(`messages/${uid}`)
      .once('value')
      .then(snapshot => {
        cb('randomMessageText', snapshot.val().text);
      });
  };

  filteredMessages = uid =>
    this.db
      .ref('messages')
      .orderByChild('userId')
      .equalTo(uid);

  messages = () => this.db.ref('messages');

  getAllMessages = () => this.db.ref('messages');

  async getRandomMessage(index, cb) {
    let name;
    this.db
      .ref('messages')
      .orderByChild('index')
      .equalTo(Math.floor((Math.random() * index) + 1))
      .once('value')
      .then(snapshot => {
        snapshot.forEach(function(data) {
          cb(data.key);
        });
      });

    return name;
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
