// React
import React, { Component } from 'react';

// Redux
import {connect} from 'react-redux';

// React Router DOM
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

// Components
import Login from './components/Login/Login';
import Areas from './components/Areas/Areas';
import Header from './components/Header/Header';
import Favorites from './components/Favorites/Favorites';
import ListingsContainer from './components/ListingsContainer/ListingsContainer';
import DetailedListing from './components/DetailedListing/DetailedListing';

// Actions
import { login } from './actions/login';

import './App.css';

class App extends Component {
  componentDidMount() {
    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn) {
      this.props.logUserIn();
    }
  }

  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route exact={true} path="/">
            <Login/>
          </Route>
          <Route exact={true} path="/areas">
            <Areas />
          </Route>
          <Route path="/favorites">
            <Favorites/>      
          </Route>
          <Route exact={true} path="/areas/:areaId/listings">
            <ListingsContainer 
              showFav = {false}
            />
          </Route>
          <Route 
            path="/areas/:areaId/listings/:listingId"
            render = {(props) => <DetailedListing {...props} />}
          >
            <DetailedListing />
          </Route>
          <Route path="*">
            <div>
              Page not found!
            </div>
          </Route>
        </Switch>
      </Router>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logUserIn: () => dispatch(login())
});

export default connect(null, mapDispatchToProps)(App);
