import { listingsFetchConstants } from "../constants/index";

export const fetchErrorOccured = (bool) => ({
  type: listingsFetchConstants.FETCH_FAIL,
  hasErrored: bool
});

export const fetchListingsSuccess = (listings) => ({
  type: listingsFetchConstants.FETCH_SUCCESS,
  listings
});

export const fetchListings = (url) => {
  return (dispatch) => {
    fetch(url)
      .then(response => response.json())
      .then(listingData => {
        return dispatch(fetchListingsSuccess(listingData.listings))
      })
      .catch(() => dispatch(fetchErrorOccured(true)))
  }
}
