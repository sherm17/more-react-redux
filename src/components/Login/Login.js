import React from 'react';
import './Login.css';

import Areas from "../Areas/Areas";

function Login({handleSubmit, handleChange, loggedIn}) {

  return (
    <>
      {
        loggedIn
          ?
          <Areas />
          :
          <div className="login">
            <form
              action=""
              className="login__form"
              onSubmit={handleSubmit}
            >
              <h2 className="login__form__text">
                Log in
                </h2>
              <div className="form-row">
                <input
                  type="email"
                  className="login__form__email"
                  placeholder="Email"
                  onChange={handleChange}
                />
              </div>
              <div className="form-row">
                <input
                  type="password" className="login__form__password"
                  placeholder="Password"
                  onChange={handleChange}
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

export default Login;