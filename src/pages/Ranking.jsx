import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Ranking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ranking: [],
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.saveRanking();
  }

  getPlayer() {
    const { player } = JSON.parse(localStorage.getItem('state'));
    const formatPlayer = {
      name: player.name,
      score: player.score,
      picture: this.getURL(player.email),
    };
    return formatPlayer;
  }

  getURL(email) {
    const emailHash = md5(email).toString();
    const urlPic = `https://www.gravatar.com/avatar/${emailHash}`;
    return urlPic;
  }

  sortPlayers(players) {
    const sorted = players.sort((a, b) => b.score - a.score);
    return sorted;
  }

  saveRanking() {
    const player = this.getPlayer();

    if (localStorage.getItem('ranking')) {
      const ranking = JSON.parse(localStorage.getItem('ranking'));
      const rankingUpdated = [...ranking, player];
      this.sortPlayers(rankingUpdated);
      this.setState({
        ranking: rankingUpdated,
      });
      return localStorage.setItem('ranking', JSON.stringify(rankingUpdated));
    }

    const ranking = [
      player,
    ];
    localStorage.setItem('ranking', JSON.stringify(ranking));
    this.setState({
      ranking,
    });
  }

  handleClick() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { ranking } = this.state;
    console.log(ranking);
    return (
      <div className="container-ranking">
        <h2 data-testid="ranking-title">Ranking</h2>
        <div className="container-list">
          <ol className="list-map">
            {ranking.map(({ name, score, picture }, index) => (
              <li key={ index }>
                <img
                  src={ picture }
                  alt="User avatar"
                />
                <p data-testid={ `player-name-${index}` }>{name}</p>
                <p data-testid={ `player-score-${index}` }>{score}</p>
              </li>))}
          </ol>
        </div>
        <div className="button-ranking">
          <button
            type="button"
            onClick={ this.handleClick }
            data-testid="btn-go-home"
          >
            Página inicial
          </button>
        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default Ranking;
