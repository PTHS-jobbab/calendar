import * as actionTypes from "../actions/actionTypes";
import { handleActions } from "redux-actions";
import { takeLatest } from "redux-saga/effects";
import * as authAPI from "../../lib/api/auth";
import createRequestSaga from "../../components/user/createRequestSaga";
import produce from "immer";

const getInfoSaga = createRequestSaga(actionTypes.GETINFO, authAPI.userdata);
const putInfoSaga = createRequestSaga(actionTypes.PUTINFO, authAPI.userdata);
export function* userSaga() {
  yield takeLatest(actionTypes.GETINFO, getInfoSaga);
  yield takeLatest(actionTypes.PUTINFO, putInfoSaga);
}

const initialState = {
  userinfo: {
    nickname: "",
    Email: "",
    firstname: "",
    lastname: "",
    phonenumber: "",
    password: "",
    passwordConfirm: "",
  },
  user: null,
  userError: null,
  userModifySuccess: null,
};

export default handleActions(
  {
    [actionTypes.INITIALIZE_INFO]: (state) => ({
      ...state,
      userinfo: initialState.userinfo,
      user: null,
      userError: null,
      userModifySuccess: null,
    }),
    [actionTypes.CHANGE_INFO]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value;
      }),
    [actionTypes.SET_USER]: (state, { payload: user }) => ({
      ...state,
      user,
    }),
    [actionTypes.GETINFO_SUCCESS]: (state, { payload: userinfo }) => ({
      ...state,
      userinfo: {
        ...userinfo,
        password: "",
        passwordConfirm: "",
      },
      userError: null,
      userModifySuccess: false,
    }),
    [actionTypes.GETINFO_FAILURE]: (state, { payload: error }) => ({
      ...state,
      userError: error,
    }),
    [actionTypes.PUTINFO_SUCCESS]: (state) => ({
      ...state,
      userError: null,
      userModifySuccess: true,
    }),
    [actionTypes.PUTINFO_FAILURE]: (state, { payload: error }) => ({
      ...state,
      userError: error,
      userModifySuccess: false,
    }),
  },
  initialState
);
