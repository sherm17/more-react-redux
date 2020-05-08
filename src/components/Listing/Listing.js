import React, { Component } from 'react';
import "./Listing.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { faTimes } from '@fortawesome/free-solid-svg-icons';

class Listing extends Component {
  constructor(props) {
    super(props);
    const {
      details, area, name,
      listing_id, toggleFavorites,
      area_id, isFavorite
    } = props;
    const { superhost, beds, baths, cost_per_night } = details;
    const listingImg = process.env.PUBLIC_URL + `/images/${listing_id}_a.jpg`;
    this.state = {
      details,
      area, name,
      listing_id,
      superhost, beds, baths, cost_per_night,
      listingImg,
      isFavorite
    }
  }

  handleFavClick = (e) => {
    e.preventDefault();
    let {toggleFavorites, showFavButton, removeFavorites} = this.props;
    if (showFavButton) {
      toggleFavorites(this.props);
      this.setState({
        isFavorite: !this.state.isFavorite
      })
    } else {
      removeFavorites(this.props);
      console.log("delete from favorite");
    }
  }

  render() {
    const {
      details, listingImg,
      area, name,
      listing_id,
      superhost, beds, baths, cost_per_night,
    } = this.state;
    const { toggleFavorites, area_id, showFavButton } = this.props;
    const { isFavorite } = this.state;
    const buttonIcon = showFavButton ? faHeart : faTimes;
    return (
      <div className="each-listing">
        <div className="info-side">
          <Link to={`/areas/${area_id}/listings/${listing_id}`} >
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
        </div>

        <div className="listing__favorite">
          <button
            className="favorite"
            onClick={this.handleFavClick}
          >
            <FontAwesomeIcon icon={buttonIcon}
              className={isFavorite ? "center red" : "center"}
            />
          </button>
        </div>
      </div>
    )
  }
}

export default Listing;