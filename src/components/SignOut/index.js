import React from 'react';
import * as ROUTES from '../../constants/routes';
import { Link } from 'gatsby';
import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  <button
    type="button"
    onClick={firebase ? firebase.doSignOut : () => {}}
  >
    Sign Out
    <Link to={ROUTES.LANDING} />
  </button>
);

export default withFirebase(SignOutButton);
