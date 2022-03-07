import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from './Loading';
import { createUser } from '../services/userAPI';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      buttonDisabled: true,
      loading: false,
      loggedIn: false,
    };
  }

  handleChange = ({ target }) => {
    const { value } = target;
    const minLengthInput = 3;

    this.setState(() => ({
      name: value,
      buttonDisabled: value.length < minLengthInput,
    }));
  }

  loginChangeSubmit = (event) => {
    const { name } = this.state;
    event.preventDefault();

    this.setState({
      loading: true,
    },
    async () => {
      await createUser({ name });
      this.setState({
        loading: false,
        loggedIn: true,
      });
    });
  }

  render() {
    const { buttonDisabled, loading, loggedIn } = this.state;
    return (
      <div data-testid="page-login">
        {
          (loading === true)
            ? (<Loading />)
            : (
              <form>
                <input
                  data-testid="login-name-input"
                  type="text"
                  onChange={ this.handleChange }
                />
                <button
                  data-testid="login-submit-button"
                  type="button"
                  disabled={ buttonDisabled }
                  onClick={ this.loginChangeSubmit }
                >
                  Entrar
                </button>
              </form>
            )
        }
        {loggedIn && <Redirect to="/search" />}
      </div>
    );
  }
}

// ----- Referências -----
// REdirect: https://v5.reactrouter.com/web/api/Redirect
