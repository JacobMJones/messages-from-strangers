import React, { Fragment } from 'react';
import Layout from '../components/layout';
import { Link } from 'gatsby';
import * as ROUTES from '../constants/routes';
// import * as ROLES from '../constants/roles';

// import { AuthUserContext } from '../Session';
// import SignOutButton from '../SignOut';

const LandingPage = () => (
  <Fragment>
    <img style={{height:'50vh', width:'auto'}}src="/images/banner-homepage.png"/>
    <br/>
    <div style={{fontSize:'24px'}}>
    <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    <br />
    <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </div>
  </Fragment>
);

export default () => (
  <Layout>
    <LandingPage />
  </Layout>
);
