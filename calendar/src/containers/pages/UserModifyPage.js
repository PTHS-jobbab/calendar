import React from "react";
import UserModifyForm from "../../components/user/UserModifyForm";
import UserTemplate from "../../components/user/UserTemplate";

const UserModifyPage = () => {
  return (
    <UserTemplate>
      <UserModifyForm />
    </UserTemplate>
  );
};

export default UserModifyPage;
