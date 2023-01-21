import axios from "./axios";

/*
A list of async functions that request specific data from the database.
*/

// Posts functions
export const getPosts = async (page?: number): Promise<ForumPostsData> => {
  return axios.get(`api/v1/posts?page=${page}`).then((res) => res.data);
};
export const getPostsByProfileId = async (
  profile_id: number
): Promise<ForumPostsData> => {
  return axios
    .get(`api/v1/posts?profile_id=${profile_id}`)
    .then((res) => res.data);
};
export const getPostsByUsername = async (
  username: string
): Promise<ForumPostsData> => {
  return axios.get(`api/v1/posts?username=${username}`).then((res) => res.data);
};
export const getPostsByTagNames = async (
  tag_names: string[]
): Promise<ForumPostsData> => {
  return axios
    .get(`api/v1/posts?tag_names[]=${tag_names.join(`&tag_names[]=`)}`)
    .then((res) => res.data);
};
export const getPost = async (id: string): Promise<ForumPostWithTags> => {
  return axios
    .get(`api/v1/posts/${id}`)
    .then((res) => res.data)
    .then((res) => {
      return { ...res, type: "post_with_tags" };
    });
};
export const addPost = async (post: ForumPost) => {
  return axios.post("api/v1/posts", post);
};
export const updatePost = async (post: ForumPost) => {
  return axios.patch(`api/v1/posts/${post.id}`, post);
};
export const deletePost = async (id: string) => {
  return axios.delete(`api/v1/posts/${id}`);
};

// Comments functions
export const getComments = async (post_id: string): Promise<ForumComment[]> => {
  return axios.get(`api/v1/posts/${post_id}/comments`).then((res) => res.data);
};
export const getComment = async (id: string): Promise<ForumComment> => {
  return axios
    .get(`api/v1/comments/${id}`)
    .then((res) => res.data)
    .then((res) => {
      return { ...res, type: "comment" };
    });
};
export const getCommentsByUsername = async (username: string) => {
  return axios
    .get(`api/v1/comments?username=${username}`)
    .then((res) => res.data);
};
export const addComment = async (comment: ForumComment) => {
  return axios.post(`api/v1/posts/${comment.post_id}/comments`, comment);
};
export const updateComment = async (comment: ForumComment) => {
  return axios.patch(`api/v1/comments/${comment.id}`, comment);
};
export const deleteComment = async (id: string) => {
  return axios.delete(`api/v1/comments/${id}`);
};

// Profiles functions
export const addProfile = async (forumProfile: ForumProfile) => {
  return axios.post(`api/v1/profiles`, forumProfile);
};
export const getProfile = async (id: number): Promise<ForumProfile> => {
  return axios.get(`api/v1/profiles/${id}`).then((res) => res.data);
};
export const getProfileByUserId = async (
  user_id: number
): Promise<ForumProfile> => {
  return axios
    .get(`api/v1/profiles?user_id=${user_id}`)
    .then((res) => res.data);
};
export const getProfileByUsername = async (
  username: string
): Promise<ForumProfile> => {
  return axios
    .get(`api/v1/profiles?username=${username}`)
    .then((res) => res.data);
};
export const updateProfile = async (profile: ForumProfile) => {
  return axios.patch(`api/v1/profiles/${profile.id}`, profile);
};
export const getUsernames = async () => {
  return axios
    .get(`api/v1/profiles?attribute=username`)
    .then((res) => res.data);
};

// Tags functions
export const getTags = async () => {
  return axios.get(`api/v1/tags`).then((res) => res.data);
};
export const getTag = async (id: number) => {
  return axios.get(`api/v1/tags/${id}`).then((res) => res.data);
};
// export const addTag = async (forumTag: ForumTag) => {
//     return axios.post(`api/v1/tags`, forumTag)
// }
export const getTagsByPostId = async (post_id: number) => {
  return axios.get(`api/v1/tags?post_id=${post_id}`).then((res) => res.data);
};

// PostsTags functions
export const addPostTag = async (postsTag: ForumPostsTag) => {
  return axios.post(`api/v1/posts_tags`, postsTag);
};
export const deletePostsTagByPostIdAndTagName = async (
  post_id: number,
  tag_name: string
) => {
  return axios.get(
    `api/v1/posts_tags?state=destroy&post_id=${post_id}&tag_name=${tag_name}`
  );
};
