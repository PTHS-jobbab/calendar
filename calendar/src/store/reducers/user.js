import * as actionTypes from "../actions/actionTypes";
import { handleActions } from "redux-actions";
import { takeLatest } from "redux-saga/effects";
import * as authAPI from "../../lib/api/auth";
import createRequestSaga from "../../components/user/createRequestSaga";

const getInfoSaga = createRequestSaga(actionTypes.GETINFO, authAPI.userdata);
const putInfoSaga = createRequestSaga(actionTypes.PUTINFO, authAPI.userdata);
export function* userSaga() {
  yield takeLatest(actionTypes.GETINFO, getInfoSaga);
  yield takeLatest(actionTypes.PUTINFO, putInfoSaga);
}

const initialState = {
  userInfo: {
    nickname: null,
    Email: null,
    firstname: null,
    lastname: null,
    phonenumber: null,
  },
  user: null,
  userError: null,
};

export default handleActions(
  {
    //일단은 이거로 유저 셋팅함.
    [actionTypes.SET_USER]: (state, { payload: user }) => ({
      ...state,
      user,
    }),
    [actionTypes.GETINFO_SUCCESS]: (state, { payload: userInfo }) => ({
      ...state,
      userinfo: userInfo,
      userError: null,
    }),
    [actionTypes.GETINFO_FAILURE]: (state, { payload: error }) => ({
      ...state,
      userError: error,
    }),
    [actionTypes.PUTINFO_SUCCESS]: (state) => ({
      ...state,
      userError: null,
    }),
    [actionTypes.PUTINFO_FAILURE]: (state, { payload: error }) => ({
      ...state,
      userError: error,
    }),
  },
  initialState
);
