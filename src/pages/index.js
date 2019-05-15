import React, { Fragment } from 'react';
import Layout from '../components/layout';
import { Link } from 'gatsby';
import * as ROUTES from '../constants/routes';
// import * as ROLES from '../constants/roles';

// import { AuthUserContext } from '../Session';
// import SignOutButton from '../SignOut';

const LandingPage = () => (
  <Fragment>
    <h1>Messages from Strangers</h1>
    <p>
      A site for sending and receiving anonymous messages
    </p>

    <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    <br />
    <Link to={ROUTES.SIGN_IN}>Sign In</Link>
  </Fragment>
);

export default () => (
  <Layout>
    <LandingPage />
  </Layout>
);
