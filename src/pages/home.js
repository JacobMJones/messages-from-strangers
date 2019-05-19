import React, { Component, Fragment } from 'react';
import { navigate } from 'gatsby';
import { compose } from 'recompose';
import Layout from '../components/layout';
import { withAuthorization } from '../components/Session';
import { withFirebase } from '../components/Firebase';
import * as ROUTES from '../constants/routes';
import styled from 'styled-components';
import device from '../constants/devices.js';

const Button = styled.div`
  @media ${device.mobile} {
    height: 90%;
    width: 90%;
    font-family: Raleway;
    font-size: 4em;
    border-radius: 5px;
    background-color: white;
    border: solid 0.1rem;
    cursor: pointer;
  }
  @media ${device.laptop} {
    height: 100%;
    width: 50%;
    font-family: Raleway;
    font-size: 4em;
    border-radius: 5px;
    background-color: white;
    border: solid 0.1rem;
    cursor: pointer;
  }
`;
const OutterContainer = styled.div`
  height: 90vh;
  width: 100vw;
  position: absolute;
  left: 0;
  top: 0;
  text-align: center;
`;
const InnerContainer = styled.div`
  height: ${props => props.height && props.height}%;
  width: 90%;
  margin: 2vh;
  display: inline-block;
`;
const UtilityIcon = styled.div`
  @media ${device.mobile} {
    height: 100px;
    width: auto;
    flex: 1;
    width: auto;
    margin: 10px;
  }
  @media ${device.laptop} {
    height: 100px;
    width: 100px;
    margin: 40px;
    cursor: pointer;
  }
`;

class HomePageBase extends Component {
  constructor(props) {
    super(props);
    this.state = { canRender: false };
  }
  componentDidMount() {
    this.setState({ canRender: true });
  }
  render() {
    const firebase = this.props.firebase;
    return (
      <div style={{ maxMidth: '100vw', maxHeight: '100vh' }}>
        {this.state.canRender && (
          <OutterContainer>
            <InnerContainer style={{ marginTop: '24px' }} height={30}>
              <Button
                as="button"
                onClick={() => {
                  navigate(ROUTES.READ);
                }}
              >
                Read.
              </Button>
            </InnerContainer>
            <InnerContainer height={30}>
              <Button
                as="button"
                onClick={() => {
                  navigate(ROUTES.WRITE);
                }}
              >
                Write.
              </Button>
            </InnerContainer>

            <InnerContainer height={10}>
              <UtilityIcon
                as="img"
                src="/images/user-icon.png"
                onClick={() => {
                  navigate(ROUTES.ACCOUNT);
                }}
              />
              <UtilityIcon
                as="img"
                src="/images/door.png"
                onClick={() => {
                  firebase.doSignOut();
                }}
              />
            </InnerContainer>
          </OutterContainer>
        )}
      </div>
    );
  }
}

const condition = authUser => !!authUser;
const HomePage = compose(withAuthorization(condition))(
  withFirebase(HomePageBase),
);
export default () => (
  <Layout>
    <HomePage />
  </Layout>
);
