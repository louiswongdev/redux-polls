import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import LoadingBar from 'react-redux-loading-bar';

import { handleInitialDate } from '../actions/shared';
import Dashboard from './Dashboard';
import Leaderboard from './Leaderboard';
import AddPoll from './AddPoll';
import Poll from './Poll';
import Nav from './Nav';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialDate());
  }
  
  render() {
    const { loading } = this.props;
    return (
      <Router>
        <>
          <LoadingBar />
          <div className="container">
            <Nav />
            {loading === true 
              ? null
              : <div>
                  <Route exact path='/'  component={Dashboard} />
                  <Route exact path='/leaderboard' component={Leaderboard} />
                  <Route exact path='/polls/:id' component={Poll} />
                  <Route exact path='/add' component={AddPoll} />
                </div>
            }
          </div>
        </>
      </Router>
    )
  }
}

const mapStateToProps = ({ authedUser }) => ({
  loading: authedUser === null
})



export default connect(mapStateToProps)(App);