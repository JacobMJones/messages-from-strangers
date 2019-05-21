import React, { Fragment } from 'react';

import Layout from '../components/layout';
import SignUpForm from '../components/SignUp';

const SignUpPage = () => (
  <Fragment>
    <h1 style={{ fontFamily: 'Raleway', fontSize: '2.5em' }}>
      Sign Up
    </h1>

    <SignUpForm />
  </Fragment>
);

export default () => (
  <Layout>
    <div style={{ textAlign: 'center' }}>
      <SignUpPage />
    </div>
  </Layout>
);
