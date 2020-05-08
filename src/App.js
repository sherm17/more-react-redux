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
    }
  }


  handleChange = (e) => {
    const type = e.target.type;
    const value = e.target.value;
    this.setState({
      [type]: value
    });
  }

  removeFavorites = (listItem) => {
    const {listing_id} = listItem;
    let {favorites} = this.state;
    favorites = favorites.filter(fav => fav.listing_id !== listing_id);
    this.setState({
      favorites
    });
  }

  updateFavorites = (listItem) => {
    const { listing_id } = listItem;
    const {favorites} = this.state;
    let foundIndex = null;
    for (var i = 0; i < favorites.length; i++) {
      if (favorites[i].listing_id === listing_id) {
        foundIndex = i;
        break;
      }
    }
    if (foundIndex !== null) {
      favorites.splice(foundIndex, 1);
    } else {
      favorites.push(listItem)
    }
    this.setState({
      favorites,
    }, () => console.log(this.state));
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
    const { loggedIn, favorites } = this.state;
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
            <Favorites 
              favorites = {favorites}
              removeFavorites = {this.removeFavorites}
            />      
          </Route>
          <Route exact={true} path="/areas/:areaId/listings">
            <ListingsContainer 
              showFav = {false}
              updateFavorites = {this.updateFavorites}
              favorites = {favorites}
              removeFavorites = {this.removeFavorites}
            />
          </Route>
          <Route 
            path="/areas/:areaId/listings/:listingId"
            render = {(props) => <DetailedListing {...props} />}
          >
            <DetailedListing />
          </Route>
        </Switch>
      </Router>
    );
  }
}
export default App;
