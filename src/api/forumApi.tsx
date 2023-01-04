import { AxiosResponse } from 'axios'
import axios from './axios'

export const getPosts = async (): Promise<ForumPost[]> => {
    return axios.get('api/v1/posts').then((res) => res.data)
}

export const getPost = async (id: string): Promise<ForumPost> => {
    return axios.get(`api/v1/posts/${id}`)
        .then((res) => res.data)
        .then((res) => { return { ...res, type: 'post' } })
}

export const getComments = async (id: string): Promise<ForumComment[]> => {
    return axios.get(`api/v1/posts/${id}/comments`).then((res) => res.data)
}

export const getComment = async (id: string): Promise<ForumComment> => {
    return axios.get(`api/v1/comments/${id}`)
        .then((res) => res.data)
        .then((res) => { return { ...res, type: 'comment' } })
}

export const addPost = async (post: ForumPost) => {
    return axios.post('api/v1/posts', post)
}

export const addComment = async (comment: ForumComment) => {
    return axios.post(`api/v1/posts/${comment.post_id}/comments`, comment)
}

export const updatePost = async (post: ForumPost) => {
    return axios.patch(`api/v1/posts/${post.id}`, post)
}

export const updateComment = async (comment: ForumComment) => {
    return axios.patch(`api/v1/comments/${comment.id}`, comment)
}

export const deletePost = async (id: string) => {
    return axios.delete(`api/v1/posts/${id}`)
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

export const defaultCatch = (err: AxiosResponse) => {
    console.log(err)
}

export const mutateForumObject = async (forumObject: ForumObject, mutateOperation: MutateOperation) => {
    // for create/edit/delete post/comment only
    switch (`${forumObject.type}_${mutateOperation}`) {
        case 'comment_create':
            return addComment(forumObject)
        case 'comment_update':
            return updateComment(forumObject)
        case 'comment_delete':
            return deleteComment(forumObject.id)
        case 'post_create':
            return addPost(forumObject)
        case 'post_update':
            return updatePost(forumObject)
        case 'post_delete':
            return deletePost(forumObject.id)
        default:
            break;
    }
}

export const addProfile = async (forumProfile: ForumProfile) => {
    return axios.post(`api/v1/profiles`, forumProfile)
}
export const getProfile = async (id: number): Promise<ForumProfile> => {
    return axios.get(`api/v1/profiles/${id}`).then(res => res.data)
}
export const getProfileByUserId = async (id: number): Promise<ForumProfile> => {
    return axios.get(`api/v1/profiles?user_id=${id}`).then(res => res.data)
}
export const getProfileByUsername = async (username: string): Promise<ForumProfile> => {
    return axios.get(`api/v1/profiles?username=${username}`).then(res => res.data)
}


