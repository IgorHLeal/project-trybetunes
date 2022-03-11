import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../pages/Loading';
import { addSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      checked: false,
    };
  }

  // Usar a mesma lógica do component Login ou Álbum para essa função
  // Concluído na mentoria com ajuda do Braddock e dos colegas André Alves e Hugo Mafra - Turma 19A
  handleChange = ({ target }) => {
    const { checked } = target;
    const { id } = this.props;
    this.setState({
      loading: true,
      checked,
    },
    async () => {
      await addSong(id);
      this.setState({
        loading: false,
      });
    });
  }

  render() {
    const { loading, checked } = this.state;
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
                    checked={ checked }
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
  id: PropTypes.string.isRequired,
  music: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
};
