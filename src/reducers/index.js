import { login } from "./login";
import { favorites } from "./favorites";
import { areas } from "./areas";
import { listings } from "./listings";
import { combineReducers } from "redux";


const rootReducer = combineReducers({
  login,
  favorites,
  areas,
  listings
});

export default rootReducer;

