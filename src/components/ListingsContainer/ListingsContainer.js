import React, { Component } from 'react';
import { connect } from 'react-redux';

import Listing from '../Listing/Listing';

import { addFav, removeFav } from '../../actions/favorites';
import { fetchListings } from '../../actions/listings';
import { withRouter } from 'react-router-dom';

import uuid from 'react-uuid';
import './ListingsContainer.css';

class ListingsContainer extends Component {
  constructor(props) {
    super(props);
    const { showFav } = this.props;
    this.state = {
      listings: null,
      reRenderList: true,
      showFav
    }
  }

  getListingInArea = (listings) => {
    const areaId = Number.parseInt(this.props.match.params.areaId);
    return listings.filter(l => l.area_id === areaId);
  }

  checkIfAlreadyFavorite = (listings) => {
    const { favoritesList } = this.props;
    listings = listings.map(eachListing => {
      return { ...eachListing, isFavorite: false }
    });
    listings.forEach(item => {
      for (var i = 0; i < favoritesList.length; i++) {
        const { listing_id } = item;
        if (favoritesList[i].listing_id === listing_id) {
          item.isFavorite = true;
          break;
        }
      }
    });
    return listings;
  }

  componentDidMount() {
    const listingAPIurl = "http://localhost:3001/api/v1/listings";
    this.props.fetchListings(listingAPIurl);
  }

  shouldComponentUpdate(nextProps, nextState) {
    // stop rerender of area after favoriting a listing
    if (nextState.reRenderList === false) {
      return false
    }
    return true;
  }

  stopRerender = () => {
    this.setState({
      reRenderList: false
    });
  }

  render() {
    const { areaListings, loading, fetchSuccess } = this.props;
    const { toggleFavorites } = this.props;
    let listingDisplay;
    let updatedAreaListings = this.getListingInArea(areaListings);
    updatedAreaListings = this.checkIfAlreadyFavorite(updatedAreaListings);
    if (areaListings) {
      listingDisplay = updatedAreaListings.map(eachListing => {
        return <Listing
          {...eachListing}
          key={uuid()}
          showFavButton={true}
          stopRerender={this.stopRerender}
          toggleFavorites={toggleFavorites}
        />
      });
    }

    return (
      <div className="listings-container">
        {
          loading ?
            "Loading...."
            :
            fetchSuccess ?
              listingDisplay
              :
              "Error"
        }
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  toggleFavorites: listItem => dispatch(addFav(listItem)),
  removeFavorites: listItem => dispatch(removeFav(listItem)),
  fetchListings: url => dispatch(fetchListings(url))
});

const mapStateToProps = (state) => {
  return {
    favoritesList: state.favorites.favoritesList,
    areaListings: state.listings.listings,
    loading: state.listings.loading,
    fetchSuccess: state.listings.fetchSuccess
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListingsContainer));


