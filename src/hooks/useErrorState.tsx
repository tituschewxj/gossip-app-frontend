import { useEffect, useState } from "react";

/**
 * Error state determines if the error dialog is displayed and the message displayed
 * @returns 
 */
export function useErrorState() {
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
