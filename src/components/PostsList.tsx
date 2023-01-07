import { Grid, Paper, Typography } from '@mui/material';
import React from 'react'

import Post from './Post'

function PostsList(props: { forumPost: ForumPost[] }) {
  return (
    <>
      {/* <Typography variant='h4' align='center'>Posts</Typography> */}
      {props.forumPost && props.forumPost.map((forumPost) => {
        return (
          <Post key={forumPost.id} forumPost={forumPost} />
        )
      })}
    </>
  );
}

export default PostsList;