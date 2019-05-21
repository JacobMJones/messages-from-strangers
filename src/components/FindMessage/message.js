import React, { Fragment } from 'react';
import { navigate } from 'gatsby';
import { compose } from 'recompose';
import Layout from '../../components/layout';
import { withAuthorization } from '../../components/Session';

import * as ROUTES from '../constants/routes';
import styled from 'styled-components';
import device from '../../constants/devices.js';

const Button = styled.div`
  height: 10vh;
  width: 20vw;
`;

const FoundMessageBase = message => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh'
    }}
  >
      {console.log('hello message', message)}
    <div style={{ flex: 1, backgroundColor: 'pink' }} />
    <div style={{ flex: 1, textAlign:'center' }}>
    
    </div>
    <div style={{ flex: 1, backgroundColor: 'pink' }} />
  </div>
);

const condition = authUser => !!authUser;
const FoundMessagePage = compose(withAuthorization(condition))(FoundMessageBase);

export default () => (
  <Layout>
    <FoundMessagePage />
  </Layout>
);
