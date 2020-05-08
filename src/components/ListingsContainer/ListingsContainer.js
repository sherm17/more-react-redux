import React, { Component } from "react";
import "./ListingsContainer.css";

import { withRouter } from "react-router-dom";
import Listing from "../Listing/Listing";
import uuid from "react-uuid";


class ListingsContainer extends Component {
  constructor(props) {
    super(props);
    const {showFav, updateFavorites} = this.props;
    this.state = {
      listings: null,
      reRenderList: true,
      showFav
    }
  }

  checkIfAlreadyFavorite = (listings) => {
    const {favorites} = this.props;
    listings.forEach(item => {
      for (var i = 0; i < favorites.length; i++) {
        const {listing_id} = item;
        if (favorites[i].listing_id === listing_id) {
          console.log("found a fav")
          item.isFavorite = true;
          break;
        }
      }
    });
    return listings;
  }

  componentDidMount() {
    const areaId = Number.parseInt(this.props.match.params.areaId);
    const listingAPIurl = "http://localhost:3001/api/v1/listings";
    fetch(listingAPIurl)
      .then(response => response.json())
      .then(jsonData => {
        const { listings } = jsonData;
        let areaListings = listings
          .filter(listing => listing.area_id === areaId)
          .map(listing => {
            return { ...listing, isFavorite: false }
          });
        let updatedAreaListings = this.checkIfAlreadyFavorite(areaListings);
        this.setState({
          listings: updatedAreaListings,
        });
      })
      .catch(err => console.log(err));
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.reRenderList == false) {
      return false
    }
    return true;
  }

  toggleFavorites = (listingItem) => {
    const {updateFavorites} = this.props;
    updateFavorites(listingItem);

    this.setState({
      reRenderList: false
    });
  }

  render() {
    const { listings, showFav } = this.state;
    const { toggleFavorites, updateFavorites, favorites, removeFavorites } = this.props;
    let listingDisplay;
    let listsToShow = listings;

    if (listsToShow) {
      listingDisplay = listsToShow.map(eachListing => {
        const { details, area, superhost, cost_per_night } = eachListing;
        return <Listing
          {...eachListing}
          key={uuid()}
          toggleFavorites = {this.toggleFavorites}
          showFavButton = {true}
          removeFavorites = {removeFavorites}
        />
      });
    }

    return (
      <div className="listings-container">
        {
          listings ?
            listingDisplay
            :
            "Loading...."
        }
      </div>
    )
  }
}

export default withRouter(ListingsContainer);


