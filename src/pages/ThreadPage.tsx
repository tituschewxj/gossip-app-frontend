import React, { useState } from 'react'
import Post from '../components/Post'
import Comment from '../components/Comment'
import { Box, Button } from '@mui/material'
import { useParams } from 'react-router-dom'
// import axios from '../api/axios'
import DefaultFormCard from '../components/DefaultFormCard'
import Container from '@mui/material/Container'
import { initForumComment } from '../types/typeDefaults'
import DefaultDialog from '../components/DefaultDialog'
import { useMutation, useQuery } from 'react-query'
import { addComment, getComments, getPost } from '../api/forumApi'
import { FormContext, UserContext } from '../hooks/context'
import AddCommentFormCard from '../components/Form/AddCommentFormCard'

function ThreadPage() {
  const [isAddingComment, setIsAddingComment] = useState<boolean>(false)
  const { post_id } = useParams();
  const [errorVisible, setErrorVisible] = useState<boolean>(false)

  const { data: forumPost } = useQuery('post', () => getPost(`${post_id}`))
  const { data: comments } = useQuery('post_comments', () => getComments(`${post_id}`))


  // const { mutate } = useMutation(async (forumComment: ForumComment) => addComment(forumComment))

  return (
    <Container sx={{ marginTop: 3 }}>
      {forumPost && <Post forumPost={forumPost} />}
      {!isAddingComment && <Button onClick={() => setIsAddingComment(true)}>add comment</Button>}
      {isAddingComment && <Box sx={{ margin: 1 }}>
        <AddCommentFormCard
          handleCancel={() => setIsAddingComment(false)}
          handleSubmitSuccess={() => {
            setIsAddingComment(false)
            window.location.reload()
          }}
        />
      </Box>}
      {comments && comments
        .filter(comment => comment.post_id === forumPost?.id)
        .map(comment => {
          return (<Comment key={comment.id} commentDetails={comment} />)
        })}
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