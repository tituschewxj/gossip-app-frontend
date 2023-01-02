import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Box, Button, Card, Container, Typography } from '@mui/material'

import { AxiosResponse } from 'axios'

import { useMutation } from 'react-query'

import DefaultDialog from './DefaultDialog'
import useFormHeader from '../hooks/useFormHeader'
import DefaultFormCardTextFields from './Form/DefaultFormCardTextFields'
import { initForumPost } from '../types/typeDefaults'
import { mutateForumObject } from '../api/forumApi'

function DefaultFormCard(props: { formBehaviour: FormBehaviour, forumObject: ForumObject }) {
  const [forumObject, setForumObject] = useState<ForumObject>(initForumPost() as ForumObject)
  const formHeader = useFormHeader({ formBehaviourType: props.formBehaviour.type, forumObjectType: props.forumObject.type })
  const [deleteConfirmationDialogVisible, setDeleteConfirmationDialogVisible] = useState<boolean>(false)
  const [errorVisible, setErrorVisible] = useState<boolean>(false)
  const navigate = useNavigate()

  useEffect(() => {
    setForumObject(props.forumObject)
  }, [props.forumObject])

  const defaultResponse = () => {
    // console.log(res)
    if (props.formBehaviour.handleAfterSubmit) {
      props.formBehaviour.handleAfterSubmit()
      return
    } else {
      navigate(-1)
    }
  }
  const defaultCatch = (err: AxiosResponse) => {
    console.log(err)
    setErrorVisible(true)
  }

  const { mutate } = useMutation(async (props: { forumObject: ForumObject, mutateOperation: MutateOperation }) => {
    return mutateForumObject(props.forumObject, props.mutateOperation)
  }, {
    onSuccess: () => {
      console.log('success')
      defaultResponse()
    },
    onError: (err: AxiosResponse) => {
      defaultCatch(err)
    }
  })

  const handleSubmit = () => {
    if (props.formBehaviour.handleSubmit) {
      props.formBehaviour.handleSubmit()
      return
    }
    switch (props.formBehaviour.type) {
      case 'new':
        return mutate({ forumObject: forumObject, mutateOperation: 'create' })
      case 'edit':
        return mutate({ forumObject: forumObject, mutateOperation: 'update' })
      default:
        break;
    }
  }

  const handleCancel = () => {
    if (props.formBehaviour.handleCancel) {
      props.formBehaviour.handleCancel()
    } else {
      if (!errorVisible) navigate(-1) // redirect to previous page
    }
  }

  const handleDelete = () => {
    mutate({ forumObject: forumObject, mutateOperation: 'delete' })
  }

  const handleDeleteConfirmationDialog = () => {
    setDeleteConfirmationDialogVisible(true)
  }
  return (
    <Container>
      <Card>
        {formHeader && <Box sx={{ margin: 1 }}>
          <Typography variant="h5" align="center">
            {formHeader}
          </Typography>
        </Box>}
        <DefaultFormCardTextFields forumObject={forumObject} onChangeSetState={setForumObject} />


        {/* Buttons */}
        <Box sx={{ margin: 1 }}>
          {props.formBehaviour.type === "new" && <Button variant='contained' sx={{ margin: 1 }}
            onClick={handleSubmit}>
            {"Create"}
          </Button>}

          {props.formBehaviour.type === "edit" && <Button variant='contained' sx={{ margin: 1 }}
            onClick={handleSubmit}>
            {"Update"}
          </Button>}

          {props.formBehaviour.type === "edit" && <Button variant='contained' sx={{
            margin: 1,
            backgroundColor: 'warning.main',
            '&:hover': {
              backgroundColor: 'warning.dark'
            }
          }}
            onClick={handleDeleteConfirmationDialog}>
            {"Delete"}
          </Button>}

          {props.formBehaviour.type === "login" && <Button variant='contained' sx={{ margin: 1 }}
            onClick={handleSubmit}>
            {"Login"}
          </Button>}

          {props.formBehaviour.type === "login" && <Button variant='contained' sx={{ margin: 1 }}
            onClick={() => {navigate('/register')}}>
            {"Register"}
          </Button>}


          {props.formBehaviour.type === "register" && <Button variant='contained' sx={{ margin: 1 }}
            onClick={handleSubmit}>
            {"Register"}
          </Button>}

          {props.formBehaviour.type === "logout" && <Button variant='contained' sx={{ margin: 1 }}
            onClick={handleSubmit}>
            {"Logout"}
          </Button>}

          <Button variant='contained' sx={{
            margin: 1,
            backgroundColor: 'secondary.main',
            '&:hover': {
              backgroundColor: 'secondary.dark'
            }
          }}
            onClick={handleCancel}>
            Cancel
          </Button>
          <DefaultDialog open={deleteConfirmationDialogVisible} dialogBehaviour={{
            type: "confirmation",
            handleConfirmation: () => {
              setDeleteConfirmationDialogVisible(false)
              handleDelete()
            },
            handleClose: () => setDeleteConfirmationDialogVisible(false),
          }} />
          <DefaultDialog open={errorVisible} dialogBehaviour={{
            type: 'error',
            handleClose: () => setErrorVisible(false),
          }} />
        </Box>
      </Card>
    </Container>
  )
}

export default DefaultFormCard