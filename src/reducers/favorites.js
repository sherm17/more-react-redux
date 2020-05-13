import { favoritesConstants } from "../constants/index"

let initialState = {
  favoritesList: []
}

export const favorites = (state = initialState, action) => {
  switch (action.type) {
    case favoritesConstants.TOGGLE_FAVORITE:
      let {listItem} = action;
      let { listing_id } = listItem;
      let favCopy = [...state.favoritesList];
      const foundItem =
        state.favoritesList.find(item => item.listing_id === listing_id);
      if (foundItem) {
        favCopy = favCopy.filter(fav => fav.listing_id !== listing_id);
        return {
          ...state,
          favoritesList: [...favCopy]
        }
      } else {
        return {
          ...state,
          favoritesList: [...state.favoritesList, listItem]
        }
      }
    case favoritesConstants.REMOVE_FAVORITE:
      const listing = action.listItem;
      const id = listing.listing_id;
      return { 
        ...state,
        favoritesList: [...state.favoritesList.filter(fav => fav.listing_id !== id)]
      }
    default:
      return state;
  }
}

export default favorites;
