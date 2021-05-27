import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeField, initializeform } from "../../store/actions/auth";
import AuthForm from "./AuthForm";

const SigninForm = () => {
  const dispatch = useDispatch();
  const { form } = useSelector(({ auth }) => ({
    form: auth.signin,
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
  };

  useEffect(() => {
    dispatch(initializeform("signin"));
  }, [dispatch]);

  return (
    <AuthForm
      type="signin"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};

export default SigninForm;
