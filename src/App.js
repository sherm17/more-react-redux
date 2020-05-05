import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import "./App.css";

import Login from "./components/Login/Login";
import Areas from "./components/Areas/Areas";
import Header from "./components/Header/Header";
import Favorites from "./components/Favorites/Favorites";
import ListingsContainer from "./components/ListingsContainer/ListingsContainer";
import DetailedListing from "./components/DetailedListing/DetailedListing";


class App extends Component {
  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
      loggedIn: false,
      areas: null,
      favorites: [],
      listings: []
    }
  }


  handleChange = (e) => {
    const type = e.target.type;
    const value = e.target.value;
    this.setState({
      [type]: value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    if (email && password) {
      this.setState({
        loggedIn: true
      })
    } else {
      alert("You need to enter a password and email")
    }
  }

  render() {
    const { loggedIn } = this.state;
    return (
      <Router>
        <Header />
        <Switch>
          <Route exact={true} path="/">
            <Login
              loggedIn={loggedIn}
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
            />
          </Route>
          <Route exact={true} path="/areas">
            <Areas />
          </Route>
          <Route path="/favorites">
            <Favorites />
          </Route>
          <Route exact={true} path="/areas/:areaId/listings">
            <ListingsContainer />
          </Route>
          <Route path="/areas/:areaId/listings/:listingId">
            <DetailedListing />
          </Route>
        </Switch>
      </Router>
    );
  }
}
export default App;
