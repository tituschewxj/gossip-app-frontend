import React from 'react'
import Comment from '../components/Comment'

function CommentsList(props: { forumComments: ForumComment[] }) {
    return (
        <>
            {props.forumComments &&
                props.forumComments.map(comment => {
                    return (<Comment key={comment.id} commentDetails={comment} />)
                })}
        </>
    )
}

export default CommentsList