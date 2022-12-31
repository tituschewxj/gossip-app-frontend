export { };

declare global {

    type PostsDetails = PostDetails[]

    type ForumObject = ForumPost | ForumObject | ForumTag | ForumUser

    type ForumObjectType = "post" | "comment" | "tag" | "user"

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
        type: "user"
        email: string
        username: string
        temp_password: string
        encrypted_password?: string
        reset_password_token?: string
        reset_password_sent_at?: string
        remember_created_at?: string
        created_at?: string
        updated_at?: string
        jti?: string
    }

    type FormBehaviourType = "edit" | "new" | "login" | "register"
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