import React, { useState } from 'react'
import Post from '../components/Post'

import { useParams } from 'react-router-dom'

import { Box, Button } from '@mui/material' 
import Container from '@mui/material/Container'
import { initForumComment } from '../types/typeDefaults'
import DefaultDialog from '../components/DefaultDialog'
import { useMutation, useQuery } from 'react-query'
import { addComment, getComments, getPost } from '../api/forumApi'
import AddCommentFormCard from '../components/Form/AddCommentFormCard'
import CommentsList from '../components/CommentsList'

function ThreadPage() {
  const { post_id } = useParams();
  const [errorVisible, setErrorVisible] = useState<boolean>(false)

  const { data: forumPost } = useQuery('post', () => getPost(`${post_id}`))
  const { data: comments } = useQuery('post_comments', () => getComments(`${post_id}`))

  return (
    <Container sx={{ marginTop: 3 }}>
      {forumPost && <Post forumPost={forumPost} disabledClickable />}
      <Box sx={{ margin: 1 }}>
        <AddCommentFormCard
          handleCancel={() => {}}
          handleSubmitSuccess={() => {
            window.location.reload()
          }}
        />
      </Box>
      {comments && <CommentsList forumComments={comments} />}
      <DefaultDialog open={errorVisible} dialogBehaviour={{
        type: 'error',
        handleClose: () => setErrorVisible(false)
      }} />
    </Container>
  )
}

export default ThreadPage
/*
shows the specific post and its comments

ability to add comment
*/