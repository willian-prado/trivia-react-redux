import React, { Component } from 'react';
import { connect } from 'react-redux';
// import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import logo from '../trivia.png';

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
  }

  // async getAvatar() {
  //   const { email } = this.state;
  //   const emailHash = md5(email).toString();
  //   console.log(emailHash);

  //   const response = await fetch(`https://www.gravatar.com/avatar/${emailHash}`);
  //   const resolve = await response.json();
  //   localStorage.setItem('token', JSON.stringify(resolve));
  // }

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
    const { history } = this.props;
    history.push('/game');
    this.getToken();
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
};

export default connect()(Login);
