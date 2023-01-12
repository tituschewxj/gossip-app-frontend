import React from "react";
import { useNavigate } from "react-router-dom";
import LoginFormCard from "../components/Form/LoginFormCard";
import RegisterFormCard from "../components/Form/RegisterFormCard";

function AuthenticationPage(props: {
  authenticationOperation: AuthenticationOperation;
}) {
  const navigate = useNavigate();
  return (
    <>
      {props.authenticationOperation === "login" && (
        <LoginFormCard
          handleCancel={() => navigate(-1)}
          handleSubmitSuccess={() => navigate("/")}
        />
      )}
      {props.authenticationOperation === "register" && (
        <RegisterFormCard
          handleCancel={() => navigate(-1)}
          handleSubmitSuccess={() => navigate("/")}
        />
      )}
    </>
  );
}

export default AuthenticationPage;
