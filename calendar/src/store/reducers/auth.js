import { handleActions } from "redux-actions";
import * as actionTypes from "../actions/actionTypes";
import produce from "immer";
import { takeLatest } from "redux-saga/effects";
import createRequestSaga from "../../components/auth/createRequestSaga";
import * as authAPI from "../../lib/api/auth";

const signupSaga = createRequestSaga(actionTypes.SIGNUP, authAPI.signup);
const signinSaga = createRequestSaga(actionTypes.SIGNIN, authAPI.signin);
const signoutSaga = createRequestSaga(actionTypes.SIGNOUT, authAPI.signout);
export function* authSaga() {
  yield takeLatest(actionTypes.SIGNUP, signupSaga);
  yield takeLatest(actionTypes.SIGNIN, signinSaga);
  yield takeLatest(actionTypes.SIGNOUT, signoutSaga);
}

const initialState = {
  signup: {
    username: "",
    nickname: "",
    Email: "",
    password: "",
    passwordConfirm: "",
  },
  signin: {
    username: "",
    password: "",
  },
  auth: null,
  authError: null,
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
      authError: null,
    }),
    [actionTypes.INITIALIZE_AUTH]: (state) => ({
      ...state,
      auth: null,
      authError: null,
    }),
    [actionTypes.SIGNUP_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    [actionTypes.SIGNUP_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    [actionTypes.SIGNIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    [actionTypes.SIGNIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    [actionTypes.SIGNOUT_SUCCESS]: (state) => ({
      ...state,
      authError: null,
      auth: null,
    }),
    [actionTypes.SIGNOUT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
  },
  initialState
);

export default auth;
