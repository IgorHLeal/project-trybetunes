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

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const result = await getMusics(id);
    console.log(result);
  }

  /* handleChange = ({ target }) => {
    const { value } = target;

    this.setState({
      collectionId: value,
    });
  }

  handleChangeMusic = () => {
    const { collectionId } = this.state;
    this.setState({
      loading: true,
    },
    async () => {
      const returnMusic = await getMusics(collectionId);
      console.log(returnMusic);
      this.setState({
        loading: false,
        collectionId: '',
        searchMusics: returnMusic,
      });
    });
  }
 */
  render() {
    const { loading, searchMusics } = this.state;
    return (
      <div data-testid="page-album">
        {
          (loading === true)
            ? (<Loading />)
            : (
              <>
                <Header />

                <div className="card-music">
                  {searchMusics.map}
                </div>
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
// match.params:
//      1. https://pt.stackoverflow.com/questions/337407/passar-match-params-para-dentro-de-outro-component
//      2. https://www.oreilly.com/library/view/react-router-quick/9781789532555/88981f68-f90b-41e4-b483-747f15587c81.xhtml
//      3. https://v5.reactrouter.com/web/api/match

// componentDidMount: https://github.com/luacomacento/revisao-react/blob/main/src/App.js
