import React from 'react';
import * as ROUTES from '../../constants/routes';
import { Link } from 'gatsby';
import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  // <button
  //   type="button"
  //   onClick={firebase ? firebase.doSignOut : () => {}}
  // >
    <Link to={ROUTES.LANDING}>Sign Out</Link> 
  
  // </button>
);

export default withFirebase(SignOutButton);
