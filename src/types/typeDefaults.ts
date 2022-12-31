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
    }
    return {
        ...defaults,
        ...options,
    }
}

export function initForumComment(options?: Partial<ForumComment>): ForumComment {
    const defaults: ForumComment = {
        type: "comment",
        // id: undefined,
        content: "",
        author: "default author",
        // created_at: undefined,
        // updated_at: undefined,
        // post_id: undefined,
    }
    return {
        ...defaults,
        ...options,
    }
}

export function initForumUser(options?: Partial<ForumUser>): ForumUser {
    const defaults: ForumUser = {
        type: "user",
        username: "",
        email: "",
        temp_password: "",
    }
    return {
        ...defaults,
        ...options,
    }
}