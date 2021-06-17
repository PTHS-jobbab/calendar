import React, { useEffect, useState } from "react";
import UserForm from "./UserForm";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getInfo, changeInfo, putInfo } from "../../store/actions/user";

function UserModifyForm({ history }) {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { form, user, userError, userModifySuccess } = useSelector(
    ({ user }) => ({
      form: user.userinfo,
      user: user.user,
      userError: user.userError,
      userModifySuccess: user.userModifySuccess,
    })
  );

  const onChange = (e) => {
    const { value, id } = e.target;
    console.log("onChange에 의해:");
    console.log("value:" + value + "   id:" + id);
    dispatch(
      changeInfo({
        form: "userinfo",
        key: id,
        value,
      })
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const {
      username,
      nickname,
      Email,
      lastname,
      firstname,
      phonenumber,
      password,
      passwordConfirm,
    } = form;
    if (
      [
        username,
        nickname,
        Email,
        lastname,
        firstname,
        phonenumber,
        password,
        passwordConfirm,
      ].includes("")
    ) {
      setError("빈 칸을 모두 입력하세요");
      return;
    }
    if (password !== passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다.");
      dispatch(changeInfo({ form: "modify", key: "password", value: "" }));
      dispatch(
        changeInfo({ form: "modify", key: "passwordConfirm", value: "" })
      );
      return;
    }
    dispatch(
      putInfo({
        username,
        nickname,
        Email,
        lastname,
        firstname,
        phonenumber,
        password,
      })
    );
  };

  useEffect(() => {
    if (userModifySuccess) {
      history.push("./userinfo");
    }
  }, [userModifySuccess, history]);

  useEffect(() => {
    console.log("MyPageModify 에 진입했기에 getInfo dispatch  ");
    dispatch(getInfo(user));
  }, [dispatch, user]);

  useEffect(() => {
    if (userError) {
      console.log("userError발생");
      console.log(userError);
      return;
    }
    if (user) {
      console.log(user + "의 My Page Modify");
    }
  }, [userError, user]);

  useEffect(() => {
    if (!user) {
      console.log("로그인하라고 돌려보내기");
      alert("로그인 중이지 않습니다.");
      history.push("signin");
    }
  }, [user, history]);

  return (
    <UserForm
      type="usermodify"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
}

export default withRouter(UserModifyForm);
