import { loginConstants } from '../constants/index'

let initialState = {
  loggedIn: false,
}

export const login = (state = initialState, action) => {
  switch (action.type) {
    case loginConstants.LOGIN:
      return { ...state, loggedIn: true }
    case loginConstants.LOGOUT:
      return { ...state, loggedIn: false }
    default:
      return state;
  }
}

export default login;
