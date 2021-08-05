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
    };

    this.handlerClick = this.handlerClick.bind(this);
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
    return (
      <div>
        <Header score={ 0 } />
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
