import React, { Fragment } from 'react';

import Layout from '../components/layout';
import SignInForm, { SignInGoogle } from '../components/SignIn';
import { SignUpLink } from '../components/SignUp';
import { PasswordForgetLink } from '../components/PasswordForget';

const SignInPage = () => (
  <Fragment>
    <h1 style={{fontFamily:'Raleway', fontSize:'2.5em'}}>Sign In</h1>
    <SignInForm />
    <SignUpLink />
    {/* <SignInGoogle />

    <PasswordForgetLink />
    <SignUpLink /> */}
  </Fragment>
);

export default () => (
  <Layout>

    <div style={{textAlign:'center'}}>
    <SignInPage />

    </div>
  </Layout>
);
