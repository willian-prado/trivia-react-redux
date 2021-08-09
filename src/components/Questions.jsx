import React from 'react';
import PropTypes from 'prop-types';

class Questions extends React.Component {
  renderNextButton() {
    const { handlerNext } = this.props;
    return (
      <button
        type="button"
        data-testid="btn-next"
        onClick={ handlerNext }
        id="next-button"
      >
        Próxima
      </button>);
  }

  render() {
    const {
      question: {
        category,
        question,
        correct_answer: correctAnswer,
        all_answers: allAnswers,
        difficulty,
      },
      handlerClick,
      answered,
      alternativePicked,
    } = this.props;
    return (
      <section className="container-questions">
        <p data-testid="question-category">{category}</p>
        <p data-testid="question-text">{question}</p>
        <div className={ alternativePicked }>
          {allAnswers.map((current, index) => {
            let testId = `wrong-answer-${index - 1}`;
            let classItem = 'wrongAnswer';
            if (index === 0) {
              testId = 'wrong-answer-0';
            }
            if (current === correctAnswer) {
              testId = 'correct-answer';
              classItem = 'correctAnswer';
            }
            return (
              <button
                type="button"
                data-testid={ testId }
                className={ classItem }
                disabled={ answered }
                id={ testId }
                key={ index }
                onClick={ (eventClick) => handlerClick(eventClick, difficulty) }
              >
                {current}
              </button>
            );
          })}
          {answered
            && this.renderNextButton()}
        </div>
      </section>
    );
  }
}

Questions.propTypes = {
  question: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.string.isRequired,
    all_answers: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  handlerNext: PropTypes.func.isRequired,
  answered: PropTypes.bool.isRequired,
  alternativePicked: PropTypes.string.isRequired,
  handlerClick: PropTypes.func.isRequired,
};

export default Questions;
