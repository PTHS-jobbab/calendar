import { handleActions } from "redux-actions";
import * as actionTypes from "../actions/actionTypes";
import produce from "immer";

const initialState = {
  signup: {
    username: "",
    password: "",
    passwordConfirm: "",
  },
  signin: {
    username: "",
    password: "",
  },
};

const auth = handleActions(
  {
    [actionTypes.CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value;
      }),
    [actionTypes.INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
    }),
  },
  initialState
);

export default auth;
