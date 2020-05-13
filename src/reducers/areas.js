import {areaFetchConstants} from "../constants/index";

const initialState = {
  areasList: [],
  fetchSuccess: false,
  loading: true
}

export const areas = (state = initialState, action) => {
  switch(action.type) {
    case areaFetchConstants.FETCH_SUCCESS:
      return {
        ...state,
        areasList: action.areas,
        fetchSuccess: true,
        loading: false
      }
    case areaFetchConstants.FETCH_FAIL:
      return action.hasErrored
    default: 
      return state;
  }
}