import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Dashboard extends Component {
  state = {
    showAnswered: false
  }

  showUnanswered = () => {
    this.setState(() => ({
      showAnswered: false
    }))
  }
  
  showAnswered = () => {
    this.setState(() => ({
      showAnswered: true
    }))
  }

  render() {
    const { showAnswered } = this.state;
    const { userAnsweredPolls, userUnansweredPolls } = this.props;

    const list = showAnswered === true
      ? userAnsweredPolls
      : userUnansweredPolls
    
    return (
      <div>
        <div className="dashboard-toggle">
          <button
            style={{textDecoration: showAnswered === false ? 'underline' : null}}
            onClick={this.showUnanswered}
          >
            Unanswered
          </button>
          <span> | </span>
          <button
            style={{textDecoration: showAnswered === true ? 'underline' : null}}
            onClick={this.showAnswered}
          >
            Answered
          </button>
        </div>
        <ul className="dashboard-list">
          {list.map(poll => (
            <li key={poll.id}>
              <Link to={`polls/${poll.id}`}>
                {poll.question}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ authedUser, polls, users }) => {
  // an array of user's answered polls
  const userAnsweredIds = users[authedUser].answers;

  // grab all the polls user have answered
  const userAnsweredPolls = userAnsweredIds
    .map(id => polls[id])
    .sort((a, b) => b.timestamp - a.timestamp); // sort in chronological order

  // array of IDs of every poll
  const userUnansweredPolls = Object.keys(polls)
  // filter out polls that have not been answered
  .filter(id => !userAnsweredIds.includes(id))
  .map(id => polls[id])
  .sort((a,b) => b.timestamp - a.timestamp)

    return {
      userAnsweredPolls,
      userUnansweredPolls
    }
};

export default connect(mapStateToProps)(Dashboard);
