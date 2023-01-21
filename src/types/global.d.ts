export {};

/**
 * Where most of the TypeScript types are defined.
 */
declare global {
  type ForumObject =
    | ForumPost
    | ForumObject
    | ForumTag
    | ForumUser
    | ForumProfile
    | ForumPostsTag
    | ForumPostWithTags;
  type ForumObjectType =
    | "post"
    | "comment"
    | "tag"
    | "user"
    | "profile"
    | "register"
    | "postsTag";
  type ForumPost = {
    type: "post";
    id?: number;
    title: string;
    content: string;
    created_at?: string;
    updated_at?: string;
    author: string;
    profile_id?: number;
    tags: ForumTag[];
  };
  type ForumComment = {
    type: "comment";
    id?: number;
    content: string;
    author: string;
    created_at?: string;
    updated_at?: string;
    post_id?: number;
    profile_id?: number;
  };
  type ForumTag = {
    type: "tag";
    id?: number;
    name: string;
  };
  type ForumPostsTag = {
    // used to handle the relation between posts and tags
    type: "postsTag";
    id?: number;
    post_id?: number;
    tag_name: string;
  };
  type ForumUser = {
    // used for authentication and manage jwt tokens
    type: "user";
    id?: number;
    email: string;
    password: string;
    encrypted_password?: string;
    reset_password_token?: string;
    reset_password_sent_at?: string;
    remember_created_at?: string;
    created_at?: string;
    updated_at?: string;
    jti?: string;
  };
  type ForumRegister = {
    type: "register";
    email: string;
    username: string;
    password: string;
    confirm_password: string;
  };
  type ForumProfile = {
    type: "profile";
    username: string;
    description: string;
    user_id?: number;
    id?: number;
  };
  type ForumPostWithTags = {
    // contains a post with it's related tag information
    type: "post_with_tags";
    post: ForumPost;
    tags: ForumTags[];
  };
  type ForumPostsData = {
    // The type of the posts data fetched from backend
    type: "posts_data";
    posts: ForumPost[];
    meta: PostsMeta;
    tags: ForumTag[][];
  };
  type PostsMeta = {
    // the meta information of posts used for pagination
    totalPosts: number;
    postsPerPage: number;
  };

  // FormBehaviour
  type FormBehaviour =
    | FormBehaviourEdit
    | FormBehaviourNew
    | FormBehaviourLogin
    | FormBehaviourRegister
    | FormBehaviourLogout;
  type FormBehaviourType =
    | "edit_comment"
    | "new_post"
    | "edit_post"
    | "edit_profile"
    | AuthenticationOperation;

  type DialogBehaviour = {
    type: "confirmation" | "error" | "success";
    handleConfirmation?: Function;
    // handleCancel: Function
    // handleOpen?: Function
    handleClose: Function;
  };

  // unused
  // type MutateOperation = "create" | "update" | "delete";

  type AuthenticationOperation = "login" | "register" | "logout";

  // unused
  // type UserContext = {
  //   isLoggedIn: boolean;
  //   setIsLoggedIn?: Function;
  //   username?: string;
  //   setUsername?: Function;
  // };

  type JWTToken = {
    exp: number;
    sub: string;
  };
}
