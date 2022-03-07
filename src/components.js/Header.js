import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

export default class Header extends Component {
  constructor() {
    super();

    this.state = {
      user: '',
      loading: true,
    };
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({
      loading: false,
      user: user.name,
    });
  }

  render() {
    const { user, loading } = this.state;
    return (
      <header data-testid="header-component">
        {
          loading
            ? <Loading />
            : (
              <p data-testid="header-user-name">{user}</p>
            )
        }
      </header>
    );
  }
}

// ----- Referências -----
// componentDidMount: https://github.com/luacomacento/revisao-react/blob/main/src/App.js
