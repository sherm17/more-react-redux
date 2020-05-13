import { areaFetchConstants } from "../constants/index";

export const fetchErrorOccured = (bool) => ({
  type: areaFetchConstants.FETCH_FAIL,
  hasErrored: bool
});

export const fetchAreasSuccess = (areas) => ({
  type: areaFetchConstants.FETCH_SUCCESS,
  areas
});


export const fetchAreas = (url) => {
  return (dispatch) => {
    fetch(url)
      .then(response => response.json())
      .then(areaData => {
        return dispatch(fetchAreasSuccess(areaData.areas))
      })
      .catch(() => fetchErrorOccured(true))
  }
}
