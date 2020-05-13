import React, { Component } from "react";
import { Redirect } from 'react-router-dom'

import { connect } from "react-redux";
import { login } from "../../actions/login";

import "./Login.css";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
    }
  }


  handleChange = (e) => {
    const type = e.target.type;
    const value = e.target.value;
    this.setState({
      [type]: value
    });
  }

  saveLoginToLocalStorage() {
    localStorage.setItem('loggedIn', 'true');
  }
 
  handleSubmit = (e) => {
    e.preventDefault();
    const {loginUser} = this.props;
    loginUser();
  }

  render() {
    const {loggedIn} = this.props;
    if (loggedIn) {
      this.saveLoginToLocalStorage();
    }
    return (
      <>
        {
          loggedIn
            ?
            <Redirect to="/areas" />
            :
            <div className="login">
              <form
                action=""
                className="login__form"
                onSubmit={this.handleSubmit}
              >
                <h2 className="login__form__text">
                  Log in
                </h2>
                <div className="form-row">
                  <input
                    type="text"
                    className="login__form__email"
                    placeholder="Email"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-row">
                  <input
                    type="password" className="login__form__password"
                    placeholder="Password"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-row">
                  <button
                    className="login__form__submit" type="submit">
                    Sign in
                  </button>
                </div>
              </form>
            </div>
        }
      </>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  loginUser: () => dispatch(login())
});

const mapStateToProps = state => ({
  email: state.login.email,
  password: state.login.password,
  loggedIn: state.login.loggedIn
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);