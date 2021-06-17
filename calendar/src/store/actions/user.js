import * as actionTypes from "./actionTypes";
import { createAction } from "redux-actions";

export const changeInfo = createAction(
  actionTypes.CHANGE_INFO,
  ({ form, key, value }) => ({
    form,
    key,
    value,
  })
);

export const setUser = createAction(actionTypes.SET_USER, (user) => user);

export const initializeInfo = createAction(actionTypes.INITIALIZE_INFO);

export const getInfo = createAction(
  actionTypes.GETINFO,
  (username) => username
);

export const putInfo = createAction(
  actionTypes.PUTINFO,
  ({
    username,
    nickname,
    Email,
    firstname,
    lastname,
    phonenumber,
    password,
  }) => ({
    username,
    nickname,
    Email,
    firstname,
    lastname,
    phonenumber,
    password,
  })
);
