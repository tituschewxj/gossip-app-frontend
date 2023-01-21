import { AxiosResponse } from "axios";
import axios, { hasJWTExpired } from "./axios";

/**
 * Logs in a user based on provided details
 * @param forumUser 
 * @returns 
 */
export const userLogin = async (forumUser: ForumUser) => {
  updateJWTToken();
  console.log(axios.defaults.headers.common["Authorization"]);
  return axios
    .post("login", {
      headers: {
        "Content-Type": "application/json",
      },
      user: {
        email: forumUser.email,
        password: forumUser.password,
      },
    })
    .then((res: AxiosResponse | any) => {
      console.log(res.data);
      localStorage.setItem("token", res.headers.get("Authorization"));
      updateJWTToken();
      console.log("sucessfully logged in");
      console.log(axios.defaults.headers.common["Authorization"]);
      return res.data;
    });
};

/**
 * Logs out a user
 * @returns 
 */
export const userLogout = async () => {
  return axios
    .delete("logout", {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((res: AxiosResponse) => {
      localStorage.removeItem("token");
      updateJWTToken();
      console.log("sucessfully logged out");
    });
};

/**
 * Registers a new user in the database
 * @param forumUser 
 * @returns 
 */
export const userSignup = async (forumUser: ForumUser) => {
  return axios
    .post("signup", {
      headers: {
        "Content-Type": "application/json",
      },
      user: {
        email: forumUser.email,
        password: forumUser.password,
      },
    })
    .then((res: any) => {
      console.log(res.data);
      localStorage.setItem("token", res.headers.get("Authorization"));
      updateJWTToken();
      return res.data.data.id; // user_id
    });
};

/**
 * Updates the JWT token stored in local storage
 */
export const updateJWTToken = (): void => {
  if (localStorage.getItem("token")) {
    if (hasJWTExpired()) {
      localStorage.removeItem("token");
      axios.defaults.headers.common["Authorization"] = undefined;
    } else {
      // adds the jwt token to the headers
      axios.defaults.headers.common["Authorization"] =
        localStorage.getItem("token");
    }
  } else {
    axios.defaults.headers.common["Authorization"] = undefined;
  }
};
