import React from "react";

const userContext: UserContext = {
    isLoggedIn: false,
}
export const UserContext = React.createContext(userContext)