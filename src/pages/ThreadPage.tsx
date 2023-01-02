import React, { useEffect, useState } from 'react'
import Post from '../components/Post'
import Comment from '../components/Comment'
import { Box, Button } from '@mui/material'
import { useParams } from 'react-router-dom'
import axios from '../api/axios'
import DefaultFormCard from '../components/DefaultFormCard'
import Container from '@mui/material/Container'
import { initForumComment, initForumPost } from '../types/typeDefaults'
import DefaultDialog from '../components/DefaultDialog'
import { useQuery } from 'react-query'
import { getComments, getPost } from '../api/forumApi'

function ThreadPage() {
  // const [forumPost, setForumPost] = useState<ForumPost>()
  // const [comments, setComments] = useState<ForumComment[]>()
  const [isAddingComment, setIsAddingComment] = useState<boolean>(false)
  const { post_id } = useParams();
  const [errorVisible, setErrorVisible] = useState<boolean>(false)

  // useEffect(() => {
  //   // init post
  //   axios.get(`/api/v1/posts/${post_id}/`)
  //     .then(res => res.data)
  //     .then((post: ForumPost) => {
  //       setForumPost(initForumPost(post))
  //     }).catch(err => {
  //       console.log(err)
  //       setErrorVisible(true)
  //     })

  //   // init comments
  //   axios.get(`/api/v1/posts/${post_id}/comments`)
  //     .then(res => res.data)
  //     .then((comments: ForumComment[]) => {
  //       setComments(comments)
  //     }).catch(err => {
  //       console.log(err)
  //       setErrorVisible(true)
  //     })
  // }, [post_id])

  const { data: forumPost } = useQuery('post', () => getPost(`${post_id}`))
  const { data: comments } = useQuery('post_comments', () => getComments(`${post_id}`))

  return (
    <Container sx={{ marginTop: 3 }}>
      {forumPost && <Post forumPost={forumPost} />}
      {!isAddingComment && <Button onClick={() => setIsAddingComment(true)}>add comment</Button>}
      {isAddingComment && <Box sx={{ margin: 1 }}>
        <DefaultFormCard formBehaviour={{
          type: "new",
          handleAfterSubmit: () => {
            setIsAddingComment(false)
            window.location.reload()
          },
          handleCancel: () => setIsAddingComment(false),
        }} forumObject={initForumComment({ post_id: parseInt(`${post_id}`) })} />
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