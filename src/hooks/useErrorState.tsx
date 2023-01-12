import { useEffect, useState } from "react";

export function useErrorState() {
  // determines if the error dialog is displayed and the message displayed
  const [hasError, setHasError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  useEffect(() => {
    if (!setHasError) setErrorMsg("");
  }, [setHasError]);
  const errorState = {
    hasError,
    setHasError,
    errorMsg,
    setErrorMsg,
  };
  return errorState;
}
