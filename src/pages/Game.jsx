import React, { Component } from 'react';
import md5 from 'crypto-js/md5';

export default class Game extends Component {
  getAvatar() {
    // const { email } = this.state;
    const email = 'malatoneot@gmail.com';
    const emailHash = md5(email).toString();
    console.log(emailHash);

    // const response = await fetch(`https://www.gravatar.com/avatar/${emailHash}`);
    // const resolve = await response;
    // console.log(response);
    return (
      <img
        src={ `https://www.gravatar.com/avatar/${emailHash}` }
        alt="User avatar"
        data-testid="header-profile-picture"
      />
    );
  }

  render() {
    return (
      <header>
        <div>
          { this.getAvatar() }
        </div>
        <p data-testid="header-player-name">
          NOME:
        </p>
        <span
          data-testid="header-score"
        >
          0
        </span>
      </header>
    );
  }
}
