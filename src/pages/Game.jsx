import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actionSaveQuestions from '../Redux/actions/game';
import Questions from '../components/Questions';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questionIndex: 0,
    };

    this.getAvatar = this.getAvatar.bind(this);
    // this.handlerClick = this.handlerClick.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
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

  async getQuestions() {
    const { saveQuestions } = this.props;
    const token = JSON.parse(localStorage.getItem('token'));
    const fetchTrivia = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const jsonResponse = await fetchTrivia.json();

    const questions = jsonResponse.results.map((current) => {
      const allAnswers = [current.correct_answer, ...current.incorrect_answers].sort();
      return { ...current, all_answers: allAnswers };
    });

    saveQuestions(questions);
  }

  // handlerClick() {
  //   const { questionIndex } = this.state;
  //   this.setState({
  //     questionIndex: questionIndex + 1,
  //   });
  // }

  render() {
    const { questionIndex } = this.state;
    const { questions, loading } = this.props;
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
        { loading === false && questions.length > 0
          ? <Questions question={ questions[questionIndex] } />
          : <p>Carregando</p>}
      </div>
    );
  }
}

Game.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  saveQuestions: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
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
  questions: state.game.questions,
  loading: state.game.loading,
});

const mapDispatchToProps = (dispatch) => ({
  saveQuestions: (question) => dispatch(actionSaveQuestions(question)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
