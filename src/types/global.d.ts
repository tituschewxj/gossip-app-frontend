export { };

declare global {

    type PostsDetails = PostDetails[]

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

    type FormBehaviourType = "edit" | "new" | AuthenticationOperation
    type FormBehaviour = {
        type: FormBehaviourType
        handleSubmit?: Function
        handleCancel?: Function
        handleDelete?: Function
        handleAfterSubmit?: Function
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
    
    // type ForumObject = PostObject | CommentObject

    // type PostObject = {
    //     type: "post"
    //     id?: number
    //     author?: string
    //     updated_at?: string
    //     details?: PostDetails
    // }
    // type CommentObject = {
    //     type: "comment"
    //     id?: number
    //     author?: string
    //     updated_at?: string
    //     details?: CommentDetails
    // }

    // type PostDetails = {
    //     title: string
    //     content: string
    //     tags: Tag[]
    //     // likes: int
    //     // dislikes: int
    // }

    // type CommentDetails = {
    //     post_id: int
    //     content: string
    //     // likes?: int
    //     // dislikes?: int
    // }

    // type Tag = {
    //     id: number
    //     name: string
    // }

    // user defined type guards
    // function isCommentObject(forumObject: CommentDetails | PostDetails): value is CommentDetails {
    //     return value.hasOwnProperty('comment')
    // }
    // function isPostDetails(forumObject: CommentDetails | PostDetails): value is PostDetails {
    //     return value.hasOwnProperty('post')
    // }

    // database types based of json file

}