import * as actionTypes from "../actions/actionTypes";
import { handleActions } from "redux-actions";
import { takeLatest } from "redux-saga/effects";
import * as authAPI from "../../lib/api/auth";
import createRequestSaga from "../../lib/createRequestSaga";

const checkSaga = createRequestSaga(actionTypes.CHECK, authAPI.check);
export function* userSaga() {
  yield takeLatest(actionTypes.CHECK, checkSaga);
}

const initialState = {
  user: null,
  checkError: null,
};

export default handleActions(
  {
    //일단은 이거로 유저 셋팅함.
    [actionTypes.SET_USER]: (state, { payload: user }) => ({
      ...state,
      user,
    }),
    //check의 용도 : 서버에 현재 로그인된 유저 정보를 갖고오는 것. 나중에 정보수정 등에 쓰일 것. 아직은 안쓰는거로.
    [actionTypes.CHECK_SUCCESS]: (state, { payload: user }) => ({
      ...state,
      user,
      checkError: null,
    }),
    [actionTypes.CHECK_FAILURE]: (state, { payload: error }) => ({
      ...state,
      user: null,
      checkError: error,
    }),
  },
  initialState
);
