import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLoginState from "../../hooks/useLoginState";

/**
 * Private route is used to check if a user is authenticated, before allowing the contents to be accessed.
 * @param props 
 * @returns 
 */
export default function PrivateRoute(props: {
  children?: React.ReactElement;
  checkUser?: boolean;
}) {
  const navigate = useNavigate();
  const isAuthenticated = useLoginState();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, []);
  return <>{isAuthenticated && <> {props.children} </>}</>;
}
