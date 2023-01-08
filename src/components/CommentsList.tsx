import React from 'react'
import Comment from '../components/Comment'

function CommentsList(props: { forumComments: ForumComment[], enableButtons?: boolean }) {
    return (
        <>
            {props.forumComments &&
                props.forumComments.map(comment => {
                    return (<Comment key={comment.id} forumComment={comment} enableButtons={props.enableButtons} />)
                })}
        </>
    )
}

export default CommentsList