import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeField, initializeForm, signin } from "../../store/actions/auth";
import { setUser } from "../../store/actions/user";
import AuthForm from "./AuthForm";

const SigninForm = ({ history }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  //state의 auth와 user를 갖고와 설정한다. 각각 reducer에서 설정된다. form은 username과 password를 객체화 한 것.
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
      console.log(username);
      dispatch(setUser(username));
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (user) {
      console.log(user);
      history.push("/");
    }
    try {
      if (!user) {
        let err = new error("user가 없음");
        throw err;
      }
      localStorage.setItem("user", user);
      console.log("로컬에" + user + "등록");
      console.log(localStorage);
    } catch (e) {
      console.log("유저가 없음");
    }
  }, [history, user, error]);

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
