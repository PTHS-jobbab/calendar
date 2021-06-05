import * as actionTypes from "./actionTypes";
import { createAction } from "redux-actions";

export const startLoading = createAction(
  actionTypes.START_LOADING,
  (requestType) => requestType
);

export const finishLoading = createAction(
  actionTypes.FINISH_LOADING,
  (requestType) => requestType
);
