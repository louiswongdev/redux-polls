import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAddPoll } from '../actions/polls';

class AddPoll extends Component {
  state = {
    question: '',
    a: '',
    b: '',
    c: '',
    d: ''
  };

  handleInputChange = e => {
    const { value, name } = e.target;

    this.setState(() => ({
      [name]: value
    }));
  };

  handleSubmit = e => {
    e.preventDefault();

    console.log('Add poll: ', this.state);
    this.props.dispatch(handleAddPoll(this.state));
  };

  isDisabled = () => {
    const { question, a, b, c, d } = this.state;

    return question === '' || a === '' || b === '' || c === '' || d === '';
  };

  render() {
    const { question, a, b, c, d } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="add-form">
        <h3 style={{ marginBottom: 5 }}>What is your question?</h3>
        <input
          value={question}
          name="question"
          onChange={this.handleInputChange}
          className="input"
          type="text"
        />

        <h3>What are the options</h3>
        <label className="label" htmlFor="a">
          A.
        </label>
        <input
          value={a}
          name="a"
          onChange={this.handleInputChange}
          className="input"
          id="a"
          type="text"
        />

        <label className="label" htmlFor="b">
          B.
        </label>
        <input
          value={b}
          name="b"
          onChange={this.handleInputChange}
          className="input"
          id="b"
          type="text"
        />

        <label className="label" htmlFor="c">
          C.
        </label>
        <input
          value={c}
          name="c"
          onChange={this.handleInputChange}
          className="input"
          id="c"
          type="text"
        />

        <label className="label" htmlFor="d">
          D.
        </label>
        <input
          value={d}
          name="d"
          onChange={this.handleInputChange}
          className="input"
          id="d"
          type="text"
        />
        <button className="btn" type="submit" disabled={this.isDisabled()}>
          Submit
        </button>
      </form>
    );
  }
}

export default connect()(AddPoll);
