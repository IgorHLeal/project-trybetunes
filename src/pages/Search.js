import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components.js/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import '../styles/Search.css';
import Loading from './Loading';

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      buttonDisabled: true,
      searchArtist: [],
      artistName: '',
      loading: false,
      artist: '',
    };
  }

  handleChange = ({ target }) => {
    const { value } = target;
    const minLengthInput = 2;

    this.setState(() => ({
      artistName: value,
      buttonDisabled: value.length < minLengthInput,
    }));
  }

  // Requisito 6 - Concluído com ajuda do Guilherme Cunha - Turma 19A
  handleSearchArtist = () => {
    const { artistName } = this.state;
    this.setState({
      loading: true,
    },
    async () => {
      const returnArtist = await searchAlbumsAPI(artistName);
      this.setState({
        loading: false,
        artistName: '',
        searchArtist: returnArtist,
        artist: artistName,
      });
    });
  }

  render() {
    const { buttonDisabled, artistName, loading, searchArtist, artist } = this.state;
    return (
      <div data-testid="page-search">
        {
          (loading === true)
            ? (<Loading />)
            : (
              <>
                <form>
                  <input
                    className="input-search"
                    type="text"
                    data-testid="search-artist-input"
                    name="artistName"
                    value={ artistName }
                    onChange={ this.handleChange }
                  />

                  <button
                    type="button"
                    data-testid="search-artist-button"
                    disabled={ buttonDisabled }
                    onClick={ this.handleSearchArtist }
                  >
                    Pesquisar
                  </button>
                </form>

                <Header />

                <div className="result-albums">
                  {artist && `Resultado de álbuns de: ${artist}`}
                </div>

                <div className="not-album">
                  {searchArtist.length === 0 && 'Nenhum álbum foi encontrado'}
                </div>
                <div className="card-album">
                  {searchArtist.map((album) => (
                    <div key={ album.collectionId }>
                      <div>{album.artistName}</div>
                      <div>{album.collectionName}</div>
                      <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                      <Link
                        data-testid={ `link-to-album-${album.collectionId}` }
                        to={ `/album/${album.collectionId}` }
                      >
                        Music
                      </Link>
                    </div>
                  ))}
                </div>
              </>
            )
        }
      </div>
    );
  }
}
