import React, { Component } from "react";
import "./ListingsContainer.css";

import { withRouter } from "react-router-dom";
import Listing from "../Listing/Listing";
import uuid from "react-uuid";

class ListingsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: null,
      favorites: [],
      reRenderList: true
    }
  }

  componentDidMount() {
    console.log("did mount");
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
          })
        this.setState({
          listings: areaListings,
        });
      })
      .catch(err => alert("There has been an error"));
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextState);
    if (nextState.reRenderList == false) {
      return false
    }
    return true;
  }

  toggleFavorites = (listingItem) => {
    let { favorites, listings } = this.state;
    let updatedListing;
    const { listing_id } = listingItem;
    const foundFav = favorites.find(fav => fav.listing_id === listing_id);
    if (foundFav) {
      // item already favorited so unfavorite
      updatedListing = listings.map(listing => {
        if (listing.listing_id === listing_id) {
          return { ...listing, isFavorite: false };
        }
        return listing
      });
      favorites = favorites.filter(fav => fav.listing_id != listing_id);
    } else {
      // make item favorite
      updatedListing = listings.map(listing => {
        if (listing.listing_id === listing_id) {
          return { ...listing, isFavorite: true };
        }
        return listing;
      });
      favorites.push(listingItem);
    }
    this.setState({
      favorites,
      listings: [...updatedListing],
      reRenderList: false
    }, () => {
      console.log(this.state);
    });
  }

  render() {
    const { listings } = this.state;
    const { toggleFavorites } = this.props;
    let listingDisplay;
    if (listings) {
      listingDisplay = listings.map(eachListing => {
        const { details, area, superhost, cost_per_night } = eachListing;
        return <Listing
          {...eachListing}
          key={uuid()}
          toggleFavorites={this.toggleFavorites}
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


