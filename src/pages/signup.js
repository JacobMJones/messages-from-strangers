import React, { Fragment } from 'react';

import Layout from '../components/layout';
import SignUpForm from '../components/SignUp';

const SignUpPage = () => (
  <Fragment >
    <h1 style={{marginBottom:'8vh', textAlign:'center'}}>Sign Up</h1>
    <div style={{textAlign:'center', marginBottom:'16vh'}}>
    <SignUpForm  />

    </div>
  
  </Fragment>
);

export default () => (
  <Layout>
    <SignUpPage />
  </Layout>
);
