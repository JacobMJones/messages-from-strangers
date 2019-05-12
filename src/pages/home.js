import React from 'react';
import { compose } from 'recompose';
import SignOutButton from '../components/SignOut';
import Layout from '../components/layout';
import {
  withAuthorization,
  // withEmailVerification,
} from '../components/Session';
import Messages from '../components/Messages';
import FindMessage from '../components/FindMessage';
const HomePageBase = () => (
  <div>
    <h1>Home Page</h1>
    <p>This is your homepage</p>
  </div>
);

const condition = authUser => !!authUser;

const HomePage = compose(withAuthorization(condition))(HomePageBase);

export default () => (
  <Layout>
    <HomePage />
    <Messages />
    <SignOutButton />
    <br/><br/><br/><br/><br/>
    <FindMessage />
  </Layout>
);
