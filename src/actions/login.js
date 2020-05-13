import {loginConstants} from "../constants/index";

export const login = () => ({
  type: loginConstants.LOGIN,
});

export const logout = () => ({
  type: loginConstants.LOGOUT,
});
