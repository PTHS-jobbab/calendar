import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import UserForm from "./UserForm";
import { getInfo } from "../../store/actions/user";

import { useDispatch, useSelector } from "react-redux";

function UserInfoForm({ history }) {
  const dispatch = useDispatch();
  const { form, user, userError } = useSelector(({ user }) => ({
    form: user.userinfo,
    user: user.user,
    userError: user.userError,
  }));

  useEffect(() => {
    console.log("My Page에 진입했기에 getInfo dispatch  ");
    dispatch(getInfo(user));
  }, [dispatch, user]);

  useEffect(() => {
    if (userError) {
      console.log("userError발생");
      console.log(userError);
      return;
    }
    if (user) {
      console.log(user + "의 My Page");
    }
  }, [userError, user]);

  useEffect(() => {
    if (!user) {
      console.log("로그인하라고 돌려보내기");
      alert("로그인 중이지 않습니다.");
      history.push("signin");
    }
  }, [user, history]);

  return <UserForm type="userinfo" form={form} />;
}

export default withRouter(UserInfoForm);
