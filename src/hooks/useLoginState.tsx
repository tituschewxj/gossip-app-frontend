import { updateJWTToken } from "../api/authenticationApi";

/**
 * Use login state checks if a user is logged in based on the JWT token.
 * @returns 
 */
export default function useLoginState() {
  // if logged in, token exists
  updateJWTToken();
  return localStorage.getItem("token");
}
