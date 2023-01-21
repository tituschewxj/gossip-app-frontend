import React from "react";
import { useNavigate } from "react-router-dom";
import LoginFormCard from "../components/Form/LoginFormCard";
import RegisterFormCard from "../components/Form/RegisterFormCard";
import useUserProfile from "../hooks/useUserProfile";

/**
 * Authentication page is where a user logins or registers.
 * @param props 
 * @returns 
 */
export default function AuthenticationPage(props: {
  authenticationOperation: AuthenticationOperation;
}) {
  const navigate = useNavigate();
  const userProfileContextData = useUserProfile();

  return (
    <>
      {props.authenticationOperation === "login" && (
        <LoginFormCard
          handleCancel={() => navigate(-1)}
          handleSubmitSuccess={() => {
            navigate("/")
            userProfileContextData.setUserProfile();
          }}
        />
      )}
      {props.authenticationOperation === "register" && (
        <RegisterFormCard
          handleCancel={() => navigate(-1)}
          handleSubmitSuccess={() => {
            navigate("/")
            userProfileContextData.setUserProfile();
          }}
        />
      )}
    </>
  );
}