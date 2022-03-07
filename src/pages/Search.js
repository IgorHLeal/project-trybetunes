import React, { Component } from 'react';
/* import searchAlbumsAPI from '../services/searchAlbumsAPI'; */
import Header from '../components.js/Header';

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      buttonDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    const { value } = target;
    const minLengthInput = 2;

    this.setState(() => ({
      buttonDisabled: value.length < minLengthInput,
    }));
  }

  render() {
    const { buttonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
          />

          <button
            type="button"
            testid="search-artist-button"
            disabled={ buttonDisabled }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}
