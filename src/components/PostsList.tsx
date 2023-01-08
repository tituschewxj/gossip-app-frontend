import React from 'react'

import Post from './Post'

function PostsList(props: { forumPost: ForumPost[] }) {
  return (
    <>
      {props.forumPost && props.forumPost.map((forumPost) => {
        return (
          <Post key={forumPost.id} forumPost={forumPost} enableButtons/>
        )
      })}
    </>
  );
}

export default PostsList;