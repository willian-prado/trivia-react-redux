import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import logo from '../trivia.png';

class Header extends Component {
  constructor(props) {
    super(props);

    this.getAvatar = this.getAvatar.bind(this);
  }

  getAvatar() {
    const { email } = this.props;
    const emailHash = md5(email).toString();

    return (
      <img
        src={ `https://www.gravatar.com/avatar/${emailHash}` }
        alt="User avatar"
        data-testid="header-profile-picture"
        className="avatar-header"
      />
    );
  }

  render() {
    const { name, score } = this.props;
    return (
      <header className="container-header">
        <div className="container-childdren-header">
          { this.getAvatar() }
        </div>
        <p className="container-childdren-header">
          Nome:
          <span
            data-testid="header-player-name"
            className="name-player container-childdren-header"
          >
            { name }
          </span>
        </p>
        <p className="container-childdren-header">
          Pontuação:
          <span
            data-testid="header-score"
            className="score-header container-childdren-header"
          >
            {score}
          </span>
        </p>
        <img src={ logo } className="App-logo imagem-header-trivia" alt="logo" />
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.login.name,
  email: state.login.email,
});

export default connect(mapStateToProps)(Header);
