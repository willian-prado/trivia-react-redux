import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

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
      />
    );
  }

  render() {
    const { name, score } = this.props;
    return (
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
          {score}
        </span>
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
