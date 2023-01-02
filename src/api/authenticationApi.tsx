import { AxiosResponse } from "axios";
import axios, { hasJWTExpired } from "./axios";

export const userLogin = async (forumUser: ForumUser) => {
    updateJWTToken()
    console.log(axios.defaults.headers.common['Authorization'])
    return axios.post('login', {
        headers: {
            'Content-Type': 'application/json',
        },
        user: {
            email: forumUser.email,
            password: forumUser.password,
        },
    }).then((res: AxiosResponse | any) => {
        console.log(res.data)
        localStorage.setItem("token", res.headers.get("Authorization"));
        console.log("sucessfully logged in")
        return res.data
    }).catch((err) => console.error(err));
}

export const userLogout = async () => {
    return axios.delete('logout', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('token'),
        },
    }).then((res: AxiosResponse) => {
        localStorage.removeItem('token')
        console.log("sucessfully logged out")
    }).catch((err) => console.error(err));
}

export const userSignup = async (forumUser: ForumUser) => {
    return axios.post('signup', {
        headers: {
          "Content-Type": "application/json",
        },
        user: {
          email: forumUser.email,
          password: forumUser.password,
        },
      }).then((res: any) => {
        console.log(res.data)
        localStorage.setItem("token", res.headers.get("Authorization"))
      }).catch((err) => console.error(err));
}

export const updateJWTToken = (): void => {
    if (localStorage.getItem('token')) {
        if (hasJWTExpired()) {
            localStorage.removeItem('token')
            axios.defaults.headers.common['Authorization'] = undefined
        } else {
            // adds the jwt token to the headers
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
        }
    } else {
        axios.defaults.headers.common['Authorization'] = undefined
    }
}