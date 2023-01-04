export { };

declare global {

    type ForumObject = ForumPost | ForumObject | ForumTag | ForumUser | ForumProfile
    type ForumObjectType = "post" | "comment" | "tag" | "user" | "profile" | "register"
    type ForumPost = {
        type: "post"
        id?: number
        title: string
        content: string
        created_at?: string
        updated_at?: string
        author: string
    }
    type ForumComment = {
        type: "comment"
        id?: number
        content: string
        author: string
        created_at?: string
        updated_at?: string
        post_id?: number
    }
    type ForumTag = {
        type: "tag"
        id: number
        name: string
    }
    type ForumUser = {
        // used for authentication and manage jwt tokens
        type: "user"
        id?: number
        email: string
        password: string
        encrypted_password?: string
        reset_password_token?: string
        reset_password_sent_at?: string
        remember_created_at?: string
        created_at?: string
        updated_at?: string
        jti?: string
    }
    type ForumRegister = {
        type: "register"
        email: string
        username: string
        password: string
        confirm_password: string
    }
    type ForumProfile = {
        type: "profile"
        username: string
        description: string
        user_id?: number
    }

    // FormBehaviour
    type FormBehaviour = FormBehaviourEdit | FormBehaviourNew | FormBehaviourLogin | FormBehaviourRegister | FormBehaviourLogout
    type FormBehaviourType = "edit" | "new" | AuthenticationOperation
    type FormBehaviourEdit = {
        type: 'edit'
        handleSubmit: Function
        handleSubmitSuccess: Function
        handleCancel: Function
        handleDelete: Function
    }
    type FormBehaviourNew = {
        type: 'new'
        handleSubmit: Function
        handleSubmitSuccess: Function
        handleCancel: Function
    }
    type FormBehaviourLogin = {
        type: 'login'
        handleSubmit: Function
        handleSubmitSuccess: Function
        handleCancel: Function
    }
    type FormBehaviourRegister = {
        type: 'register'
        handleSubmit: Function
        handleSubmitSuccess: Function
        handleCancel: Function
    }
    type FormBehaviourLogout = {
        type: 'logout'
        handleSubmit: Function
        handleSubmitSuccess: Function
        handleCancel: Function
    }
    type FormContext = {
        forumObject: ForumObject
        setForumObject: Function<ForumObject>
        formBehaviour: FormBehaviour
    }


    type DialogBehaviour = {
        type: "confirmation" | "error" | "success"
        handleConfirmation?: Function
        // handleCancel: Function
        // handleOpen?: Function
        handleClose: Function
    }

    type MutateOperation = 'create' | 'update' | 'delete'

    type AuthenticationOperation = 'login' | 'register' | 'logout'

    type UserContext = {
        isLoggedIn: boolean
        setIsLoggedIn?: Function
        username?: string
        setUsername?: Function
    }

    type JWTToken = {
        exp: number
        sub: string
    }
}