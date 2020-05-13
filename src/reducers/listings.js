import { listingsFetchConstants } from "../constants/index";

const initialState = {
  listings: [],
  fetchSuccess: false,
  loading: true
}

export const listings = (state = initialState, action) => {
  switch (action.type) {
    case listingsFetchConstants.FETCH_SUCCESS:
      return {
        ...state,
        listings: [...action.listings],
        loading: false,
        fetchSuccess: true
      }
    case listingsFetchConstants.FETCH_FAIL:
      return action.hasErrored;
    default: 
      return state;
  }
}