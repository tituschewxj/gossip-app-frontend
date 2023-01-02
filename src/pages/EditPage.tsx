import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
// import { setSyntheticLeadingComments } from 'typescript'
// import Card from '@mui/material/Card'
// import { Box, Button, ButtonGroup, TextField } from '@mui/material'

import { Container } from '@mui/system'
import { useQuery } from 'react-query'

import DefaultFormCard from '../components/DefaultFormCard'
import DefaultDialog from '../components/DefaultDialog'
import { initForumPost } from '../types/typeDefaults'
import { getComment, getPost } from '../api/forumApi'

function EditPage() {
  // Page for editing a post/comment
  // const [forumObject, setForumObject] = useState<ForumObject>({} as ForumObject)
  const [editType, setEditType] = useState<FormBehaviourType>('edit')
  const { post_id, comment_id } = useParams()
  const [errorVisible, setErrorVisible] = useState<boolean>(false)

  // useEffect(() => {
  //   // init content from api
  //   if (comment_id) {
  //     axios.get(`api/v1/comments/${comment_id}`)
  //       .then(res => res.data)
  //       .then((res: ForumComment) => {
  //         setForumObject({ ...res, type: "comment" })
  //       }).catch(err => {
  //         console.log(err)
  //         setErrorVisible(true)
  //       })
  //     return
  //   }
  //   if (post_id) {
  //     axios.get(`api/v1/posts/${post_id}`)
  //       .then(res => res.data)
  //       .then((res: ForumPost) => {
  //         setForumObject({ ...res, type: "post" })
  //       }).catch(err => {
  //         console.log(err)
  //         setErrorVisible(true)
  //       })
  //     return
  //   }
  //   // else: new post
  //   setForumObject(initForumPost())
  //   setEditType("new")
  // }, [post_id, comment_id])

  const { data: forumObject } = useQuery('edit_forumobject', () => {
    if (comment_id) {
      return getComment(comment_id)
    }
    if (post_id) {
      return getPost(post_id)
    }
    setEditType('new')
    return (async (): Promise<ForumComment | ForumPost> =>  initForumPost())()
  })

  return (
    <Container sx={{ marginTop: 3 }}>
      {forumObject && <DefaultFormCard formBehaviour={{
        type: editType,
      }} forumObject={forumObject as ForumObject} />}

      <DefaultDialog open={errorVisible} dialogBehaviour={{
        type: 'error',
        handleClose: () => setErrorVisible(false),
      }} />
    </Container>
  )
}

export default EditPage