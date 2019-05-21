import React, { Fragment } from 'react';
import { navigate } from 'gatsby';
import { compose } from 'recompose';
import Layout from '../components/layout';
import { withAuthorization } from '../components/Session';

import FindMessage from '../components/FindMessage';
import * as ROUTES from '../constants/routes';
import styled from 'styled-components';
import device from '../constants/devices.js';

const Button = styled.div`
  height: 10vh;
  width: 20vw;
`;

const ReadPageBase = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
    }}
  >
    <div style={{ flex: 1}} />
    <div style={{ flex: 8, textAlign:'center' }}>
      <FindMessage />
    </div>
    <div style={{ flex: 1}} />
  </div>
);

const condition = authUser => !!authUser;
const ReadPage = compose(withAuthorization(condition))(ReadPageBase);

export default () => (
  <Layout>
    <ReadPage />
  </Layout>
);
