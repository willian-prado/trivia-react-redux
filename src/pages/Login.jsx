import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../trivia.png';
import { actionSaveEmail, actionSaveName } from '../Redux/actions/login';
import actionSaveQuestions from '../Redux/actions/questions';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
    };

    this.handlerChange = this.handlerChange.bind(this);
    this.handlerClick = this.handlerClick.bind(this);
    this.handlerSettings = this.handlerSettings.bind(this);
    this.getToken = this.getToken.bind(this);
  }

  async getToken() {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const resolve = await response.json();
    localStorage.setItem('token', JSON.stringify(resolve.token));

    const { saveQuestions } = this.props;
    const token = JSON.parse(localStorage.getItem('token'));
    const fetchTrivia = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const jsonResponse = await fetchTrivia.json();

    const codeResponse = jsonResponse.response_code;
    const questions = jsonResponse.results.map((current) => {
      const allAnswers = [current.correct_answer, ...current.incorrect_answers].sort();
      return { ...current, all_answers: allAnswers };
    });

    saveQuestions(questions, codeResponse);
  }

  verifyLength() {
    const { name, email } = this.state;
    if (name.length > 0 && email.length > 0) return true;
  }

  handlerChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handlerClick() {
    const { history, saveEmail, saveName } = this.props;
    const { email, name } = this.state;
    history.push('/game');
    this.getToken();
    saveEmail(email);
    saveName(name);
  }

  handlerSettings() {
    const { history } = this.props;
    history.push('/settings');
  }

  render() {
    return (
      <div>
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <div>
            <label htmlFor="input-player-name">
              <input
                type="text"
                name="name"
                data-testid="input-player-name"
                placeholder="Digite seu nome"
                required
                onChange={ this.handlerChange }
              />
            </label>
            <label htmlFor="input-gravatar-email">
              <input
                type="email"
                name="email"
                data-testid="input-gravatar-email"
                placeholder="Digite seu email"
                required
                onChange={ this.handlerChange }
              />
            </label>
            <button
              type="button"
              data-testid="btn-play"
              disabled={ !this.verifyLength() }
              onClick={ this.handlerClick }
            >
              Jogar
            </button>
            <button
              type="button"
              data-testid="btn-settings"
              onClick={ this.handlerSettings }
            >
              Settings
            </button>
          </div>
        </header>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  saveName: PropTypes.func.isRequired,
  saveEmail: PropTypes.func.isRequired,
  saveQuestions: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (email) => dispatch(actionSaveEmail(email)),
  saveName: (name) => dispatch(actionSaveName(name)),
  saveQuestions: (question, code) => dispatch(actionSaveQuestions(question, code)),
});

export default connect(null, mapDispatchToProps)(Login);
