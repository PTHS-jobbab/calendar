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

export const initializeform = createAction(
  actionTypes.INITIALIZE_FORM,
  (form) => form
);
