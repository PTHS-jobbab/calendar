import * as actionTypes from "./actionTypes";
import { createAction } from "redux-actions";

export const setUser = createAction(actionTypes.SET_USER, (user) => user);
export const check = createAction(actionTypes.CHECK);
