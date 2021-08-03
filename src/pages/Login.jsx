import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../trivia.png';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
    };

    this.handlerChange = this.handlerChange.bind(this);
  }

  handlerChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  verifyLength() {
    const { name, email } = this.state;
    if (name.length > 0 && email.length > 0) return true;
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
            >
              Jogar
            </button>
          </div>
        </header>
      </div>
    );
  }
}

export default connect()(Login);
