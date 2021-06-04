import * as actionTypes from "./actionTypes";
import { createAction } from "redux-actions";

export const changeField = createAction(
  actionTypes.CHANGE_FIELD,
  ({ form, key, value }) => ({
    form,
    key,
    value,
  })
);

export const initializeForm = createAction(
  actionTypes.INITIALIZE_FORM,
  (form) => form
);

export const signup = createAction(
  actionTypes.SIGNUP,
  ({ username, password, nickname, Email }) => ({
    username,
    password,
    nickname,
    Email,
  })
);

export const signin = createAction(
  actionTypes.SIGNIN,
  ({ username, password }) => ({
    username,
    password,
  })
);

export const signout = createAction(actionTypes.SIGNOUT);
