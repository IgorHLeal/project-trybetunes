import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';

export default class Login extends Component {
/*  constructor(props) {
    super(props);

    this.state = {
      pageLogin: '',
      loginSubmitButton: 'disabled',
    };
  }
 */
  handleChangeOnClick = (target) => {
    const { name } = target;
    const value = target.disabled === 'disabled' ? 'disabled' : 'enabled';

    this.setState({ [name]: value });
  }

  render() {
    const { pageLogin } = this.props;
    return (
      <div data-testid="page-login">
        <form>
          <input
            data-testid="login-name-input"
            type="text"
            name="pageLogin"
            value={ pageLogin }
            id="page-login"
          />
          <button
            data-testid="login-submit-button"
            type="button"
            name="loginSubmitButton"
            id="login-submit-button"
            disabled="disabled"
            onClick={ () => createUser({ name: '' }) }
            onChange={ this.handleChangeOnClick }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  pageLogin: PropTypes.string.isRequired,
};
