import axios from './axios'

export const getPosts = async () => {
    return axios.get('/posts')
}

export const addPost = async (post: ForumPost) => {
    return axios.post('/posts', post)
}

export const updatePost = async (post: ForumPost) => {
    return axios.patch(`/posts/${post.id}`, post)
}

export const deletePost = async (id: number) => {
    return axios.delete(`/posts/${id}`)
}