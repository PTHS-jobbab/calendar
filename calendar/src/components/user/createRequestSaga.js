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
    console.log("user의 createRequestSaga 실행");
    console.log("현재의 action.payload:");
    console.log(action.payload);
    switch (action.type) {
      case actionTypes.GETINFO:
        console.log("GETINFO 시작");
        yield fetch(request, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: action.payload,
          }),
        })
          .then((response) => {
            if (!response.ok) {
              let err = new Error("HTTP status code: " + response.status);
              err.response = response;
              err.status = response.status;
              throw err;
            }
            return response.json();
          })
          .then((response) => (res = response))
          .catch((e) => (err = e));

        if (!err) {
          console.log("userSaga loading SUCCESS!");
          console.log("리스폰스:");
          console.log(res);
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
        console.log("PUTINFO 시작");
        yield fetch(request, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: action.payload.username,
            Email: action.payload.Email,
            firstname: action.payload.firstname,
            lastname: action.payload.lastname,
            phonenumber: action.payload.phonenumber,
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
