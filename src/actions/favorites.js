import {favoritesConstants} from '../constants/index';


export const addFav = (listItem) => ({
  type: favoritesConstants.TOGGLE_FAVORITE,
  listItem
});

export const removeFav = (listItem) => ({
  type: favoritesConstants.REMOVE_FAVORITE,
  listItem
});