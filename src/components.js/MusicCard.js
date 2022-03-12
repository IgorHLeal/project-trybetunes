import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../pages/Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      check: false,
    };
  }

  async componentDidMount() {
    const { trackId } = this.props;
    const favoritesMusics = await getFavoriteSongs();

    this.setState({
      check: favoritesMusics.some((favorite) => favorite.trackId === trackId),
    });
  }

  // Usar a mesma lógica do component Login para essa função
  // Concluído na mentoria com ajuda do Braddock e dos colegas André Alves e Hugo Mafra - Turma 19A
  handleChange = ({ target }, id) => {
    const { checked } = target;

    this.setState({
      loading: true,
      check: checked,
    },
    async () => {
      if (checked) {
        await addSong(id);
      }
      this.setState({
        loading: false,
      });
    });
  }

  render() {
    const { loading, check } = this.state;
    const { music } = this.props;
    const { trackName, previewUrl, trackId } = music;

    return (
      <div>
        {
          loading
            ? (<Loading />)
            : (
              <>
                <h4>{trackName}</h4>

                <audio data-testid="audio-component" src={ previewUrl } controls>
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  {' '}
                  <code>audio</code>
                  .
                </audio>

                <label htmlFor="favorite-song">
                  Favorita
                  <input
                    className="favorite-song"
                    type="checkbox"
                    data-testid={ `checkbox-music-${trackId}` }
                    name="favorite-song"
                    onChange={ this.handleChange }
                    checked={ check }
                  />
                </label>
              </>
            )
        }
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
  trackId: PropTypes.string.isRequired,
};
