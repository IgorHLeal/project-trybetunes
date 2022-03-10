import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const { music } = this.props;
    const { trackName, previewUrl, trackId } = music;

    return (
      <div>
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
          />
        </label>
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
};
