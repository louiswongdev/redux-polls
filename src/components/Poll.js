import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPercentage } from '../utils/helpers';

const getVoteKeys = () => ['aVotes', 'bVotes', 'cVotes', 'dVotes'];

class Poll extends Component {
  handleAnswer = (answer) => {
    const { poll, authedUser } = this.props;
    this.answered = true;

    console.log('Add Answer:', answer);
  }
  render() {
    if (this.props.poll === null) {
      return <p>This poll does not exist</p>;
    }

    const { poll, vote, authorAvatar } = this.props;

    const totalVotes = getVoteKeys()
      .reduce((acc, key) => acc + poll[key].length, 0);

    return (
      <div className="poll-container">
        <h1 className="question">{poll.question}</h1>
        <div className="poll-author">
          By <img src={authorAvatar} alt="Author's avatar" />
        </div>
        <ul>
          {['aText', 'bText', 'cText', 'dText'].map(key => {
            // grab number of votes in aVotes/bVotes etc arrays
            const count = poll[key[0] + 'Votes'].length;

            return (
              <li
                onClick={() => {
                  // allow user to only vote once and on polls they haven't voted on
                  if (vote === null && !this.answered) {
                    this.handleAnswer(key[0])
                  }
                }} 
                className={`option ${vote === key[0] ? 'chosen' : ''}`}>
                {vote === null 
                  ? poll[key] 
                  : <div className='result'>
                      <span>{poll[key]}</span>
                      <span>{getPercentage(count, totalVotes)}% ({count})</span>
                    </div>
                }
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

// destructure match from ownProps (second argument in mapStateToProps)
const mapStateToProps = ({ authedUser, polls, users }, { match }) => {
  const { id } = match.params;
  const poll = polls[id];

  // if poll doesn't exist
  if (!poll) {
    return {
      poll: null
    };
  }

  // see if authedUser is in any of aVotes/bVotes/cVotes/dVotes arrays via reduce
  // this is to see if authedUser has voted for poll we're on
  const vote = getVoteKeys().reduce((vote, key) => {
    // on first reduce loop, this if won't run since we start reduce at 'null'
    if (vote !== null) {
      return vote[0]; // extract first letter of aVotes/bVotes etc
    }

    return poll[key].includes(authedUser) ? key[0] : vote;
  }, null);

  // if voter has not voted at all (vote is null)
  return {
    poll,
    vote,
    authedUser,
    authorAvatar: users[poll.author].avatarURL
  };
};

export default connect(mapStateToProps)(Poll);
