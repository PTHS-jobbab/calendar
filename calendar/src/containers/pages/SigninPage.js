import React from "react";
import SigninForm from "../../components/auth/SigninForm";
import AuthTemplate from "../../components/auth/AuthTemplate";

const SigninPage = () => {
  return (
    <AuthTemplate>
      <SigninForm />
    </AuthTemplate>
  );
};

export default SigninPage;
