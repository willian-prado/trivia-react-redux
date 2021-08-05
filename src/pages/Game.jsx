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
      alternativePicked: null,
    };

    this.handlerClick = this.handlerClick.bind(this);
    this.handlerNext = this.handlerNext.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  componentDidMount() {
    this.resetTimer();
  }

  handlerClick() {
    this.setState({
      answered: true,
      alternativePicked: 'alternativePicked',
    });
  }

  handlerNext() {
    const { questionIndex } = this.state;
    this.setState({
      questionIndex: questionIndex + 1,
      answered: false,
      alternativePicked: null,
    }, () => this.resetTimer());
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
    return <p>Carregando</p>;
  }

  render() {
    const { timer } = this.state;
    return (
      <div>
        <Header score={ 0 } />
        <div>{ timer }</div>
        { this.renderQuestion() }
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
};

const mapStateToProps = (state) => ({
  questions: state.questions.questions,
  responseCode: state.questions.responseCode,
});

export default connect(mapStateToProps, null)(Game);
