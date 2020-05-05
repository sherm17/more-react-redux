import React, { Component } from 'react';
import "./Listing.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom";

class Listing extends Component {
  constructor(props) {
    super(props);
    const {
      details, area, name,
      listing_id, toggleFavorites,
      area_id,
    } = props;
    const { superhost, beds, baths, cost_per_night } = details;
    const listingImg = process.env.PUBLIC_URL + `/images/${listing_id}_a.jpg`;
    this.state = {
      details,
      area, name,
      listing_id,
      superhost, beds, baths, cost_per_night,
      listingImg,
      isFavorite: false
    }
  }

  handleFavClick = (e) => {
    this.setState({
      isFavorite: !this.state.isFavorite
    })
    const { toggleFavorites } = this.props;
    toggleFavorites(this.props);
  }

  render() {
    const {
      details, listingImg,
      area, name,
      listing_id,
      superhost, beds, baths, cost_per_night,
    } = this.state;
    const { toggleFavorites, area_id } = this.props;
    const { isFavorite } = this.state;
    return (
      <Link to = {`/areas/${area_id}/listings/${listing_id}`} >
      <div className="listing">

        <div className="listing__image">
          <img src={listingImg} alt="" />
        </div>
        <div className="listing__info">
          <div className="listing__info__item top-row padding-bottom">
            {superhost ?
              <span className="host-info">
                superhost
            </span>
              : ""
            }
            <div
              className={(superhost ? "listing-name padding-left" : "listing-name")}
            >
              {name}
            </div>
            <button
              className="favorite"
              onClick={this.handleFavClick}
            >
              <FontAwesomeIcon icon={faHeart}
                className={isFavorite ? "center red" : "center"}
              />
            </button>

          </div>

          <div className="listing__info__item">
            {beds} bedroom {baths} bath
        </div>
          <div className="listing__info__item cost">
            <span className="bold">${cost_per_night} </span>/ night
        </div>
        </div>
      </div>
      </Link>

    )
  }
}

export default Listing;