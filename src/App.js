import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';

import { setToken } from './store/actions/sessionActions';
import { fetchUser } from './store/actions/userActions';

import Spinner from './components/spinner/spinner';
import LeftSection from './containers/leftSection/leftSection';
import MainSection from './containers/mainSection/mainSection';
import RightSection from './containers/rightSection/rightSection';

import Login from './spotify/login';
import WebPlaybackReact from './spotify/webPlayback';


class App extends Component {
  state = {
 
  };

  componentDidMount() {
   
  }

  render() {

    return (
      <div className="app">
        {/* <WebPlaybackReact {...webPlaybackSdkProps}> */}
          <Spinner loading={this.state.playerLoaded}> 
            <LeftSection />
            <MainSection />
            <RightSection />
          </Spinner>
        {/* </WebPlaybackReact> */}
      </div>
    );
  }
}


export default App