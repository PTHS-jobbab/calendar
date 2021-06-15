import { put } from "redux-saga/effects";
import { startLoading, finishLoading } from "../../store/actions/loading";
import * as actionTypes from "../../store/actions/actionTypes";

export default function createRequestSaga(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* (action) {
    let err = null;
    yield put(startLoading(type));

    switch (type) {
      case actionTypes.SIGNOUT:
        yield fetch(request, {
          method: "GET",
        })
          .then((response) => {
            if (!response.ok) {
              let err = new Error("HTTP status code: " + response.status);
              err.response = response;
              err.status = response.status;
              throw err;
            }
            return response;
          })
          .catch((e) => (err = e));

        if (!err) {
          yield put({
            type: SUCCESS,
          });
        } else {
          yield put({
            type: FAILURE,
            payload: err,
            error: true,
          });
        }
        break;
      default:
        console.log(action);
        action.type === actionTypes.SIGNUP
          ? yield fetch(request, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                username: action.payload.username,
                password: action.payload.password,
                nickname: action.payload.nickname,
                Email: action.payload.Email,
              }),
            })
              .then((response) => {
                if (!response.ok) {
                  let err = new Error("HTTP status code: " + response.status);
                  err.response = response;
                  err.status = response.status;
                  throw err;
                }
                return response;
              })
              .catch((e) => (err = e))
          : yield fetch(request, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                username: action.payload.username,
                password: action.payload.password,
              }),
            })
              .then((response) => {
                if (!response.ok) {
                  let err = new Error("HTTP status code: " + response.status);
                  err.response = response;
                  err.status = response.status;
                  throw err;
                }
                return response;
              })
              .catch((e) => (err = e));

        if (!err) {
          yield put({
            type: SUCCESS,
            payload: action.payload,
          });
        } else {
          yield put({
            type: FAILURE,
            payload: err,
            error: true,
          });
        }
        break;
    }

    yield put(finishLoading(type)); // 로딩 끝
  };
}
