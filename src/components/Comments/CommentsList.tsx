import React from "react";
import Comment from "./Comment";

/**
 * CommentsList component displays a list of comments
 * @param props 
 * @returns 
 */
export default function CommentsList(props: {
  forumComments: ForumComment[];
  enableButtons?: boolean;
}) {
  return (
    <>
      {props.forumComments &&
        props.forumComments.map((comment) => {
          return (
            <Comment
              key={comment.id}
              forumComment={comment}
              enableButtons={props.enableButtons}
            />
          );
        })}
    </>
  );
}