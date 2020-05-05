import React, { Component } from "react";

import {withRouter} from "react-router-dom";

class DetailedListing extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    let {areaId, listingId} = this.props.match.params;
    areaId = Number.parseInt(areaId);
    listingId = Number.parseInt(listingId);
    // const {}
  }
  render() {
    return (
      <div>
        some detailed listing
        </div>
    )
  }
}

export default withRouter(DetailedListing);