import { useNavigate } from "react-router-dom";

// type default values
export function initForumPost(options?: Partial<ForumPost>): ForumPost {
  const defaults: ForumPost = {
    type: "post",
    // id: undefined,
    title: "",
    content: "",
    // created_at: undefined,
    // updated_at: undefined,
    author: "default author",
    tags: [],
  };
  return {
    ...defaults,
    ...options,
  };
}

export function initForumComment(
  options?: Partial<ForumComment>
): ForumComment {
  const defaults: ForumComment = {
    type: "comment",
    // id: undefined,
    content: "",
    author: "default author",
    // created_at: undefined,
    // updated_at: undefined,
    // post_id: undefined,
  };
  return {
    ...defaults,
    ...options,
  };
}

export function initForumUser(options?: Partial<ForumUser>): ForumUser {
  const defaults: ForumUser = {
    type: "user",
    // username: "",
    email: "",
    password: "",
  };
  return {
    ...defaults,
    ...options,
  };
}

export function initForumRegister(
  options?: Partial<ForumRegister>
): ForumRegister {
  const defaults: ForumRegister = {
    type: "register",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  };
  return {
    ...defaults,
    ...options,
  };
}

export function initForumProfile(
  options?: Partial<ForumProfile>
): ForumProfile {
  const defaults: ForumProfile = {
    type: "profile",
    username: "",
    // user_id: undefined,
    description: "",
  };
  return {
    ...defaults,
    ...options,
  };
}

export function initForumTag(options?: Partial<ForumTag>): ForumTag {
  const defaults: ForumTag = {
    type: "tag",
    name: "",
  };
  return {
    ...defaults,
    ...options,
  };
}
export function initForumPostsTag(
  options?: Partial<ForumPostsTag>
): ForumPostsTag {
  const defaults: ForumPostsTag = {
    type: "postsTag",
    tag_name: "",
  };
  return {
    ...defaults,
    ...options,
  };
}
