import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components.js/Header';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from '../components.js/MusicCard';

export default class Album extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      searchMusics: [],
    };
  }

  // this.props.match.params.id

  async componentDidMount() {
    /* const { match } = this.props;
    const { id } = match.params; */
    const { match: { params: { id } } } = this.props;
    /* console.log(match); */
    const result = await getMusics(id);
    /* console.log(result); */
    this.setState({
      searchMusics: result,
      loading: false,
    });
  }

  render() {
    const { loading, searchMusics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {
          (loading === true)
            ? (<Loading />)
            : (
              <>
                <img
                  src={ searchMusics[0].artworkUrl100 }
                  alt={ searchMusics[0].collectionName }
                />

                <h3 data-testid="album-name">{searchMusics[0].collectionName}</h3>
                <h3 data-testid="artist-name">{searchMusics[0].artistName}</h3>

                {searchMusics.map((music, index) => (
                  index > 0 && <MusicCard music={ music } key={ music.trackId } />
                ))}
              </>
            )
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

// ----- Referências: -----

// O Guilherme Cunha - Turma 19A me ajudou a entender o passo a passo do código que fiz e sanou várias dúvidas, principalmente sobre o match.params

// match.params:
//      1. https://pt.stackoverflow.com/questions/337407/passar-match-params-para-dentro-de-outro-component
//      2. https://www.oreilly.com/library/view/react-router-quick/9781789532555/88981f68-f90b-41e4-b483-747f15587c81.xhtml
//      3. https://v5.reactrouter.com/web/api/match

// componentDidMount: https://github.com/luacomacento/revisao-react/blob/main/src/App.js
