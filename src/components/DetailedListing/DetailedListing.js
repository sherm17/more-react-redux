import React, { Component } from 'react';
import './DetailingListing.css';
import { withRouter } from 'react-router-dom';
import uuid from 'react-uuid';

class DetailedListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listingInfo: null
    }
  }

  componentDidMount() {
    let { areaId, listingId } = this.props.match.params;
    areaId = Number.parseInt(areaId);
    listingId = Number.parseInt(listingId);
    fetch('http://localhost:3001/api/v1/listings')
      .then(response => response.json())
      .then(jsondata => {
        const { listings } = jsondata;
        const matchingListing =
          listings.find(eachListing => {
            return eachListing.area_id === areaId && eachListing.listing_id === listingId;
          });
        const { area, address, details, name } = matchingListing;
        const { baths, beds, cost_per_night, features, superhost } = details;
        const { street, zip } = address;
        const addressStr = `${street}, ${zip}`
        this.setState({
          listingInfo: matchingListing,
          areaId, listingId, area, address,
          name, baths, beds, cost_per_night,
          features, superhost, addressStr
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    const {
      listingInfo, listingId, addressStr, name,
      baths, beds, features
    } = this.state;

    const imageOne = process.env.PUBLIC_URL + `/images/${listingId}_a.jpg`;
    const imageTwo = process.env.PUBLIC_URL + `/images/${listingId}_b.jpg`;
    const imageThree = process.env.PUBLIC_URL + `/images/${listingId}_c.jpg`;
    let featureList;
    if (features) {
      featureList = features.map(eachFeature => {
        return <div key={uuid()}  className="feature">{eachFeature}</div>
      });
    }

    return (
      <div className="content">
        {
          listingInfo
            ?
            <>
              <div className="image-container">
                <div className="col big-col">
                  <div className="img-container big-img-container">
                    <div className="overlay"></div>
                    <img src={imageOne} alt="" />
                  </div>
                </div>
                <div className="col flex-col">
                  <div className="img-container small-img-container top-img">
                    <div className="overlay"></div>
                    <img src={imageTwo} alt="" />
                  </div>
                  <div className="img-container small-img-container bottom-img">
                    <div className="overlay"></div>
                    <img src={imageThree} alt="" />
                  </div>
                </div>
              </div>
              <div className="listing-detail">
                <div className="listing-detail__row">
                  <div className="listing-detail__name row-title">
                    {name}
                  </div>
                  <div className="sub-info">
                    <div className="listing-detail__bed">
                      {beds} bedrooms {baths} bathrooms
                    </div>
                    <div className="listing-detail__address">
                      {addressStr}
                    </div>
                  </div>
                </div>
                <div className="listing-detail__row ">
                  <div className="listing-detail__features ">
                    <div className="feature-title row-title">
                      Features
                  </div>
                    <div className="feature-listing">
                      {
                        featureList
                      }
                    </div>
                  </div>
                </div>
              </div>
            </>
            :
            "Loading..."
        }
      </div>
    )
  }
}

export default withRouter(DetailedListing);