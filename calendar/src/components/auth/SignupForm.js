import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeField,
  initializeForm,
  signup,
  initializeAuth,
} from "../../store/actions/auth";
import { withRouter } from "react-router-dom";
import AuthForm from "./AuthForm";

const SignupForm = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.signup,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));

  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: "signup",
        key: name,
        value,
      })
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password, passwordConfirm, nickname, Email } = form;
    if ([username, password, passwordConfirm, nickname, Email].includes("")) {
      setError("빈 칸을 모두 입력하세요");
      return;
    }
    if (password !== passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다");
      dispatch(changeField({ form: "signup", key: "password", value: "" }));
      dispatch(
        changeField({ form: "signup", key: "passwordConfirm", value: "" })
      );
      return;
    }
    dispatch(signup({ username, password, nickname, Email }));
  };

  useEffect(() => {
    dispatch(initializeForm("signup"));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      if (authError.status === 409) {
        console.log("이미 존재하는 계정");
        setError("이미 존재하는 계정명입니다.");
        return;
      }
      console.log(authError);
      console.log(authError.status);
      setError("회원가입 실패");
      return;
    }
    if (auth) {
      setError("회원가입 완료! 잠시후 로그인창으로 돌아갑니다."); //임시로 해둠
      console.log("회원가입 성공");
      console.log(auth);
      dispatch(initializeAuth()); //바로 auth를 초기화시켜 로그인 방지
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    //이미 로그인되었다 띄우고 돌려보내기
    if (user) {
      console.log("user가 존재");
      console.log(user);
    }
  }, [user]);

  return (
    <AuthForm
      type="signup"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default withRouter(SignupForm);
