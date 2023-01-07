// import { AxiosResponse } from 'axios'
import axios from './axios'

// Posts
export const getPosts = async (): Promise<ForumPost[]> => {
    return axios.get('api/v1/posts').then((res) => res.data)
}
export const getPostsByPostId = async (tag_id: number) => {
    return axios.post(`api/v1/posts?tag_id=${tag_id}`).then(res => res.data)
}
export const getPostsByProfileId = async (profile_id: number) => {
    return axios.get(`api/v1/posts?profile_id=${profile_id}`).then(res => res.data)
}
export const getPostsByUsername = async (username: string) => {
    return axios.get(`api/v1/posts?username=${username}`).then(res => res.data)
}
export const getPostsByTagName = async (tag_name: string) => {
    return axios.get(`api/v1/posts?tag_name=${tag_name}`).then(res => res.data)
}
export const getPostsByTagNames = async (tag_names: string[]) => {
    return axios.get(`api/v1/posts?tag_names[]=${tag_names.join(`&tag_names[]=`)}`).then(res => res.data)
}
export const getPost = async (id: string): Promise<ForumPost> => {
    return axios.get(`api/v1/posts/${id}`)
        .then((res) => res.data)
        .then((res) => { return { ...res, type: 'post' } })
}
export const addPost = async (post: ForumPost) => {
    return axios.post('api/v1/posts', post)
}
export const updatePost = async (post: ForumPost) => {
    return axios.patch(`api/v1/posts/${post.id}`, post)
}
export const deletePost = async (id: string) => {
    return axios.delete(`api/v1/posts/${id}`)
}


// Comments
export const getComments = async (post_id: string): Promise<ForumComment[]> => {
    return axios.get(`api/v1/posts/${post_id}/comments`).then((res) => res.data)
}
export const getComment = async (id: string): Promise<ForumComment> => {
    return axios.get(`api/v1/comments/${id}`)
        .then((res) => res.data)
        .then((res) => { return { ...res, type: 'comment' } })
}
export const getCommentsByProfileId = async (profile_id: number) => {
    return axios.get(`api/v1/profiles/${profile_id}?state=get_comments`).then(res => res.data)
}
export const getCommentsByUsername = async (username: string) => {
    return axios.get(`api/v1/profiles?username=${username}&state=get_comments`).then(res => res.data)
}
export const addComment = async (comment: ForumComment) => {
    return axios.post(`api/v1/posts/${comment.post_id}/comments`, comment)
}
export const updateComment = async (comment: ForumComment) => {
    return axios.patch(`api/v1/comments/${comment.id}`, comment)
}
export const deleteComment = async (id: string) => {
    return axios.delete(`api/v1/comments/${id}`)
}

// export const deleteForumObject = async (forumObject: ForumObject) => {
//     switch (forumObject.type) {
//         case 'post':
//             return deletePost(forumObject.id)
//         case 'comment':
//             return deleteComment(forumObject.id)
//         default:
//             break;
//     }
// }

// export const mutateForumObject = async (forumObject: ForumObject, mutateOperation: MutateOperation) => {
//     // for create/edit/delete post/comment only
//     switch (`${forumObject.type}_${mutateOperation}`) {
//         case 'comment_create':
//             return addComment(forumObject)
//         case 'comment_update':
//             return updateComment(forumObject)
//         case 'comment_delete':
//             return deleteComment(forumObject.id)
//         case 'post_create':
//             return addPost(forumObject)
//         case 'post_update':
//             return updatePost(forumObject)
//         case 'post_delete':
//             return deletePost(forumObject.id)
//         default:
//             break;
//     }
// }

// Profiles
export const addProfile = async (forumProfile: ForumProfile) => {
    return axios.post(`api/v1/profiles`, forumProfile)
}
export const getProfile = async (id: number): Promise<ForumProfile> => {
    return axios.get(`api/v1/profiles/${id}`).then(res => res.data)
}
export const getProfileByUserId = async (user_id: number): Promise<ForumProfile> => {
    return axios.get(`api/v1/profiles?user_id=${user_id}`).then(res => res.data)
}
export const getProfileByUsername = async (username: string): Promise<ForumProfile> => {
    return axios.get(`api/v1/profiles?username=${username}`).then(res => res.data)
}
export const updateProfile = async (profile: ForumProfile) => {
    return axios.patch(`api/v1/profiles/${profile.id}`, profile)
}

// Tags
export const getTags = async () => {
    return axios.get(`api/v1/tags`).then(res => res.data)
}
export const getTag = async (id: number) => {
    return axios.get(`api/v1/tags/${id}`).then(res => res.data)
}
// export const addTag = async (forumTag: ForumTag) => {
//     return axios.post(`api/v1/tags`, forumTag)
// }
export const getTagsByPostId = async (post_id: number) => {
    return axios.get(`api/v1/tags?post_id=${post_id}`).then(res => res.data)
}
// PostsTags
export const addPostTag = async (postsTag: ForumPostsTag) => {
    return axios.post(`api/v1/posts_tags`, postsTag)
}
export const deletePostsTagByPostIdAndTagName = async (post_id: number, tag_name: string) => {
    return axios.get(`api/v1/posts_tags?state=destroy&post_id=${post_id}&tag_name=${tag_name}`)
}