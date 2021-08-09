import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

import Questions from '../components/Questions';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questionIndex: 0,
      answered: false,
      timer: 30,
      alternativePicked: '',
      currentScore: 0,
      currentAssertions: 0,
    };

    this.handlerClick = this.handlerClick.bind(this);
    this.handlerNext = this.handlerNext.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  componentDidMount() {
    this.resetTimer();
    const { name, email } = this.props;
    const state = { player: {
      name,
      assertions: 0,
      score: 0,
      gravatarEmail: email,
    },
    };
    localStorage.setItem(
      'state', JSON.stringify(state),
    );
  }

  handlerClick({ target }, difficulty) {
    const { timer, currentScore, currentAssertions } = this.state;
    let difficultyMultiplier = 1;
    const hard = 3;
    const medium = 2;
    switch (difficulty) {
    case 'hard':
      difficultyMultiplier = hard;
      break;
    case 'medium':
      difficultyMultiplier = medium;
      break;
    default:
      break;
    }

    let score = currentScore;
    let assertions = currentAssertions;
    if (target.id === 'correct-answer') {
      const baseScore = 10;
      score += baseScore + (timer * difficultyMultiplier);
      assertions += 1;
    }
    const { name, email } = this.props;
    const state = { player: {
      name,
      assertions,
      score,
      gravatarEmail: email,
    },
    };
    localStorage.setItem(
      'state', JSON.stringify(state),
    );
    this.setState({
      answered: true,
      alternativePicked: 'alternativePicked',
      currentScore: score,
      currentAssertions: assertions,
    });
  }

  handlerNext() {
    const { questionIndex } = this.state;
    const maxQuestions = 3;
    if (questionIndex > maxQuestions) {
      const { history } = this.props;
      history.push('/feedback');
    }
    this.setState({
      questionIndex: questionIndex + 1,
      answered: false,
      alternativePicked: null,
    }, () => {
      this.resetTimer();
    });
  }

  resetTimer() {
    this.setState({ timer: 30 });
    const time = 1000;
    const intervalId = setInterval(() => {
      const { timer } = this.state;
      const newTimer = timer - 1;
      this.setState({ timer: newTimer }, () => {
        if (newTimer === 0) {
          clearInterval(intervalId);
          this.setState({
            answered: true,
            alternativePicked: 'alternativePicked',
          });
        }
      });
    }, time);
  }

  renderQuestion() {
    const { questionIndex, answered, alternativePicked } = this.state;
    const { questions, responseCode } = this.props;
    if (responseCode === 0) {
      return (
        <Questions
          question={ questions[questionIndex] }
          handlerClick={ this.handlerClick }
          handlerNext={ this.handlerNext }
          answered={ answered }
          alternativePicked={ alternativePicked }
        />
      );
    }
    return <p className="">Carregando</p>;
  }

  render() {
    const { timer, currentScore } = this.state;
    return (
      <div className="container-game-screen">
        <Header score={ currentScore } />
        <div className="timer-div">
          <span className="container-timer">{ timer }</span>
          { this.renderQuestion() }
        </div>
      </div>
    );
  }
}

Game.propTypes = {
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
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.questions.questions,
  responseCode: state.questions.responseCode,
  name: state.login.name,
  email: state.login.email,
});

export default connect(mapStateToProps, null)(Game);
