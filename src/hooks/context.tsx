import React, { useState } from "react";
import { initForumPost } from "../types/typeDefaults";

const userContext: UserContext = {
    isLoggedIn: false,
}
export const UserContext = React.createContext(userContext)



const defaultFormContext: FormContext = {
    forumObject: initForumPost(),
    setForumObject: () => {},
    formBehaviour: { type: 'edit', handleSubmit: () => {}, handleCancel: () => {}, handleDelete: () => {}, handleSubmitSuccess: () => {} },
}
export const FormContext = React.createContext(defaultFormContext)

// export function FormContextProvider({ ...children, value }) {
//     const [forumObject, setForumObject] = useState(initForumPost()) 

//     return (
//         <FormContext.Provider value={value}>
//             <>{children}</>
//         </FormContext.Provider>
//     )
// }

