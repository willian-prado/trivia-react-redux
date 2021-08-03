import React, { Component } from 'react';

export default class Game extends Component {
  render() {
    return (
      <header>
        <div>
          <img
            src=""
            alt=""
            data-testid="header-profile-picture"
          />
        </div>
        <p data-testid="header-player-name">
          NOME:
          <span> </span>
        </p>
        <span
          data-testid="header-score"
        >
          Placar:
        </span>
      </header>
    );
  }
}
