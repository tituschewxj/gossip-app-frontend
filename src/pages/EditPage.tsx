import axios from '../api/axios'
import React, { useEffect, useState } from 'react'
// import { setSyntheticLeadingComments } from 'typescript'
import { useParams } from 'react-router-dom'
// import Card from '@mui/material/Card'
// import { Box, Button, ButtonGroup, TextField } from '@mui/material'
import { Container } from '@mui/system'
import DefaultFormCard from '../components/DefaultFormCard'
import { initForumPost } from '../types/typeDefaults'
import DefaultDialog from '../components/DefaultDialog'

function EditPage() {
  // Page for editing a post/comment
  const [forumObject, setForumObject] = useState<ForumObject>({} as ForumObject)
  const [editType, setEditType] = useState<FormBehaviourType>("edit")
  const { post_id, comment_id } = useParams()
  const [errorVisible, setErrorVisible] = useState<boolean>(false)

  useEffect(() => {
    // init content from api
    if (comment_id) {
      axios.get(`api/v1/comments/${comment_id}`)
        .then(res => res.data)
        .then((res: ForumComment) => {
          setForumObject({ ...res, type: "comment" })
        }).catch(err => {
          console.log(err)
          setErrorVisible(true)
        })
      return
    }
    if (post_id) {
      axios.get(`api/v1/posts/${post_id}`)
        .then(res => res.data)
        .then((res: ForumPost) => {
          setForumObject({ ...res, type: "post" })
        }).catch(err => {
          console.log(err)
          setErrorVisible(true)
        })
      return
    }
    // else: new post
    setForumObject(initForumPost())
    setEditType("new")
  }, [post_id, comment_id])

  return (
    <Container sx={{ marginTop: 3 }}>
      <DefaultFormCard formBehaviour={{
        type: editType,
      }} forumObject={forumObject as ForumObject} />
      <DefaultDialog open={errorVisible} dialogBehaviour={{
        type: 'error',
        handleClose: () => setErrorVisible(false),
      }} />
    </Container>
  )
}

export default EditPage