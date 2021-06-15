import { put } from "redux-saga/effects";
import { startLoading, finishLoading } from "../../store/actions/loading";
import * as actionTypes from "../../store/actions/actionTypes";

export default function createRequestSaga(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* (action) {
    let err = null;
    let res = null;
    yield put(startLoading(type));

    console.log(action);
    switch (action.type) {
      case actionTypes.GETINFO:
        yield fetch(request, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: action.payload.username,
          }),
        })
          .then((response) => {
            if (!response.ok) {
              let err = new Error("HTTP status code: " + response.status);
              err.response = response;
              err.status = response.status;
              throw err;
            }
            console.log("리스폰스:" + response);
            return response.json();
          })
          .then((response) => (res = response))
          .catch((e) => (err = e));

        if (!err) {
          yield put({
            type: SUCCESS,
            payload: res,
          });
        } else {
          console.log(err);
          yield put({
            type: FAILURE,
            payload: err,
            error: true,
          });
        }

        break;
      case actionTypes.PUTINFO:
        yield fetch(request, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: action.payload.username,
            nickname: action.payload.nickname,
            Email: action.payload.Email,
            firstname: action.payload.firstname,
            lastname: action.payload.lastname,
            phonenumber: action.payload.phonenumber,
          }),
        })
          .then((response) => {
            if (!response.ok) {
              let err = new Error("HTTP status code: " + response.status);
              err.response = response;
              err.status = response.status;
              throw err;
            }
            console.log("리스폰스:" + response);
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
        console.log("유효하지 않은 처리");
        break;
    }

    yield put(finishLoading(type));
  };
}
