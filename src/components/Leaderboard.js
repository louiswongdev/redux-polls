import React from 'react';
import { connect } from 'react-redux';

function Leaderboard({ users }) {
  console.log('users', users)
  return (
    <ul>
      {users.map(user => (
        <li className="user" key={user.id}>
          <img src={user.avatarURL} alt={`Avatar for ${user.name}`}/>
          <div>
            <h1>{user.name}</h1>
            <p>{user.polls} Polls</p>
            <p>{user.answers} Answers</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

const mapStateToProps = ({ users }) => ({
  users: Object.keys(users).map(id => {
    const { name, avatarURL, polls, answers } = users[id];

    return {
      id,
      name,
      avatarURL,
      polls: polls.length,
      answers: answers.length
    }
  })
  // sort users with most polls answered and created at the top
  .sort((a,b) => b.polls + b.answers > a.polls + a.answers   )
})

export default connect(mapStateToProps)(Leaderboard);