import React from 'react';
import PropTypes from 'prop-types';

class Questions extends React.Component {
  render() {
    const {
      question: {
        category,
        question,
        correct_answer: correctAnswer,
        all_answers: allAnswers,
      },
      handlerClick,
    } = this.props;
    return (
      <section>
        <p
          data-testid="question-category"
        >
          { category }
        </p>
        <p
          data-testid="question-text"
        >
          { question }
        </p>
        <div>
          {allAnswers.map((current, index) => {
            let testId = `wrong-answer-${index - 1}`;
            if (index === 0) {
              testId = 'wrong-answer-0';
            }
            if (current === correctAnswer) {
              testId = 'correct-answer';
            }
            return (
              <button
                type="button"
                data-testid={ testId }
                className="wrongAnswer"
                id={ testId }
                key={ index }
                onClick={ handlerClick }
              >
                { current }
              </button>
            );
          })}
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
  handlerClick: PropTypes.func.isRequired,
};

export default Questions;
