import React, { useContext, useEffect, useState } from 'react'
import { Form, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
// import { setSyntheticLeadingComments } from 'typescript'
// import Card from '@mui/material/Card'
// import { Box, Button, ButtonGroup, TextField } from '@mui/material'

import { Container } from '@mui/system'
import { useQuery } from 'react-query'

import DefaultFormCard from '../components/DefaultFormCard'
import DefaultDialog from '../components/DefaultDialog'
import { initForumPost } from '../types/typeDefaults'
import { getComment, getPost } from '../api/forumApi'
import { FormContext } from '../hooks/context'
import EditCommentFormCard from '../components/Form/EditCommentFormCard'
import EditPostFormCard from '../components/Form/EditPostFormCard'
import AddPostFormCard from '../components/Form/AddPostFormCard'


function EditPage(props: {editType: FormBehaviourType}) {
  // Page for editing a post/comment
  // const [forumObject, setForumObject] = useState<ForumObject>({} as ForumObject)
  // const [editType, setEditType] = useState<FormBehaviourType>('edit')
  const { post_id, comment_id } = useParams()
  const navigate = useNavigate()
  const [errorVisible, setErrorVisible] = useState<boolean>(false)

  const { data: initForumObject } = useQuery('edit_forumobject', () => {
    if (comment_id) {
      return getComment(comment_id)
    }
    if (post_id) {
      return getPost(post_id)
    }
    // setEditType('new')
    return (async (): Promise<ForumComment | ForumPost> => initForumPost())()
  }, {
    onSuccess: (res) => {
      console.log(res)
      setForumObject(res)
      console.log('changed forum object')
      console.log(initForumObject)
    }
  })
  const [forumObject, setForumObject] = useState<ForumObject>();
  
  
  const formContext: FormContext = {
    forumObject: forumObject,
    setForumObject: setForumObject,
    formBehaviour: {
      type: props.editType,
      handleSubmit: () => { },
      handleSubmitSuccess: () => { },
      handleCancel: () => navigate(-1),
      handleDelete: () => { },
    },
  }

  return (
    <FormContext.Provider value={formContext}>
      <Container sx={{ marginTop: 3 }}>
        {forumObject &&
          <>
            {forumObject.type === 'comment' && props.editType === 'edit' && <EditCommentFormCard
              forumComment={forumObject}
              handleCancel={() => navigate(-1)}
              handleSubmitSuccess={() => { }} />}
            {forumObject.type === 'post' && props.editType === 'edit' && <EditPostFormCard
              forumPost={forumObject}
              handleCancel={() => navigate(-1)}
              handleSubmitSuccess={() => navigate('/')} />}
            {forumObject.type === 'post' && props.editType === 'new' && <AddPostFormCard
              handleCancel={() => navigate(-1)}
              handleSubmitSuccess={() => navigate('/')} />}
          </>
        }
        <DefaultDialog open={errorVisible} dialogBehaviour={{
          type: 'error',
          handleClose: () => setErrorVisible(false),
        }} />
      </Container>
    </FormContext.Provider>
  )
}

export default EditPage