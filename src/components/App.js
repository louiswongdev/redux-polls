import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoadingBar from 'react-redux-loading-bar'

import { handleInitialDate } from '../actions/shared';
import Dashboard from './Dashboard';
import Leaderboard from './Leaderboard';
import AddPoll from './AddPoll';
import Poll from './Poll';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialDate());
  }
  render() {
    return (
      <div>
        <LoadingBar />
        {this.props.loading === true 
          ? null
          : <Poll match={{params: { id: 'vthrdm985a262al8qx3do'}}} />
        }
      </div>
    )
  }
}

const mapStateToProps = ({ authedUser }) => ({
  loading: authedUser === null
})



export default connect(mapStateToProps)(App);