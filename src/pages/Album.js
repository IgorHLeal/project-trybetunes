import React, { Component } from 'react';
import Header from '../components.js/Header';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';

export default class Album extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      collectionId: '',
      searchMusics: [],
    };
  }

  handleChange = ({ target }) => {
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
