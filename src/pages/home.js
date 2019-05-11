import React from 'react';
import { compose } from 'recompose';

import SignOutButton from '../components/SignOut';
// import { withFirebase } from '../Firebase';
import Layout from '../components/layout';
import {
  withAuthorization,
  // withEmailVerification,
} from '../components/Session';
import Messages from '../components/Messages';

const HomePageBase = () => (
  <div>
    <h1>Home Page</h1>
    <p>The Home Page is accessible by every signed in user.</p>

    {console.log(localStorage.getItem('authUser'))}
  </div>
);

const condition = authUser => !!authUser;

const HomePage = compose(
  // withFirebase,
  withAuthorization(condition),
)(HomePageBase);

export default () => (
  <Layout>
    <HomePage />
    <Messages />
    <SignOutButton />
    <button
      onClick={() => {
        //getRandomMessage();
      }}
    >
      Find Message
    </button>
  </Layout>
);
