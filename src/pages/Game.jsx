import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Questions from '../components/Questions';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questionIndex: 0,
    };

    this.getAvatar = this.getAvatar.bind(this);
    this.handlerClick = this.handlerClick.bind(this);
  }

  getAvatar() {
    const { email } = this.props;
    const emailHash = md5(email).toString();

    return (
      <img
        src={ `https://www.gravatar.com/avatar/${emailHash}` }
        alt="User avatar"
        data-testid="header-profile-picture"
      />
    );
  }

  handlerClick({ target }) {
    const { questionIndex } = this.state;
    const time = 3000;

    target.parentNode.classList.add('alternativePicked');

    setTimeout(() => {
      this.setState({
        questionIndex: questionIndex + 1,
      });
      target.parentNode.className = '';
    }, time);
  }

  renderQuestion() {
    const { questionIndex } = this.state;
    const { questions, responseCode } = this.props;
    if (responseCode === 0) {
      return (
        <Questions
          question={ questions[questionIndex] }
          handlerClick={ this.handlerClick }
        />
      );
    }
    return <p>Carregando</p>;
  }

  render() {
    const { name } = this.props;
    return (
      <div>
        <header>
          <div>
            { this.getAvatar() }
          </div>
          <p data-testid="header-player-name">
            { name }
          </p>
          <span
            data-testid="header-score"
          >
            0
          </span>
        </header>
        {this.renderQuestion()}
      </div>
    );
  }
}

Game.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  // saveQuestions: PropTypes.func.isRequired,
  responseCode: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.string.isRequired,
    all_answers: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};

const mapStateToProps = (state) => ({
  name: state.login.name,
  email: state.login.email,
  questions: state.questions.questions,
  responseCode: state.questions.responseCode,
});

// const mapDispatchToProps = (dispatch) => ({
//   saveQuestions: (question, code) => dispatch(actionSaveQuestions(question, code)),
// });

export default connect(mapStateToProps, null)(Game);
