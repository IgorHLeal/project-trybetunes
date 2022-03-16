import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';
import '../styles/Header.css';

export default class Header extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      loading: true,
    };
  }

  async componentDidMount() {
    // Mudança feita na função getUser após ver o código do colega Imar Mendes - Turma 19A; Ficou mais nítida a proposta do que eu precisava fazer:
    // Eu declarava a const user e no seState eu acessava o user.name, ao desestruturar o { name }
    // consigo acessá-lo diretamente no setState, como feito abaixo;
    const { name } = await getUser();
    this.setState({
      loading: false,
      name,
    });
  }

  render() {
    const { name, loading } = this.state;
    return (
      <header data-testid="header-component" className="header-component">
        {
          loading
            ? (<Loading />)
            : (
              <div>
                <div className="header-name">
                  <h2>TrybeTunes</h2>
                  <h3 data-testid="header-user-name">{name}</h3>
                </div>
                <nav>
                  <Link to="/search" data-testid="link-to-search">Search</Link>
                  <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
                  <Link to="/profile" data-testid="link-to-profile">Profile</Link>
                </nav>
              </div>
            )
        }
      </header>
    );
  }
}

// ----- Referências -----
// componentDidMount: https://github.com/luacomacento/revisao-react/blob/main/src/App.js
