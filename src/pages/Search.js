import React, { Component } from 'react';
import Header from '../components.js/Header';

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      buttonDisabled: true,
    };
  }

  handleSearch = () => {
    const { search } = this.state;
    const minLengthSearch = 2;
    const validationSearch = search.length < minLengthSearch;

    this.setState({
      buttonDisabled: validationSearch,
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, this.handleSearch);
  }

  render() {
    const { search, buttonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            name="search"
            value={ search }
            onChange={ this.handleChange }
          />

          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ buttonDisabled }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}
