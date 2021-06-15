import * as actionTypes from "./actionTypes";
import { createAction } from "redux-actions";

export const setUser = createAction(actionTypes.SET_USER, (user) => user);
export const getInfo = createAction(
  actionTypes.GETINFO,
  (username) => username
);
export const putInfo = createAction(
  actionTypes.PUTINFO,
  ({ username, nickname, Email, firstname, lastname, phonenumber }) => ({
    username,
    nickname,
    Email,
    firstname,
    lastname,
    phonenumber,
  })
);
