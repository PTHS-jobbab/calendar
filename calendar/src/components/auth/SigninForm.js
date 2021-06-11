import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeField, initializeForm, signin } from "../../store/actions/auth";
import { setUser } from "../../store/actions/user";
import AuthForm from "./AuthForm";

const SigninForm = ({ history }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  //state의 auth와 user를 갖고와 설정한다. 각각 reducer에서 설정된다.
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.signin,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));

  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: "signin",
        key: name,
        value,
      })
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = form;
    dispatch(signin({ username, password }));
  };

  useEffect(() => {
    dispatch(initializeForm("signin"));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      console.log("오류 발생");
      console.log(authError);
      setError("로그인 실패");
      return;
    }
    if (auth) {
      console.log("로그인 성공");
      const { username } = auth;
      dispatch(setUser(username));
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (user) {
      history.push("/");
      try {
        localStorage.setItem("user", JSON.stringify(user));
        console.log("로컬에 user등록");
        console.log(localStorage);
      } catch (e) {
        console.log("localStorage is NOT working");
      }
    }
  }, [history, user]);

  return (
    <AuthForm
      type="signin"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default withRouter(SigninForm);
