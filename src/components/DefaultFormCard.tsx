import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Box, Button, Card, Container, Typography } from '@mui/material'

import { AxiosResponse } from 'axios'

import { useMutation } from 'react-query'

import DefaultDialog from './DefaultDialog'
import useFormHeader from '../hooks/useFormHeader'
import DefaultFormCardTextFields from './Form/DefaultFormCardTextFields'
// import { initForumPost } from '../types/typeDefaults'
import { mutateForumObject } from '../api/forumApi'
import { FormContext } from '../hooks/context'

function DefaultFormCard(props: { formHeader?: string, children?: React.ReactElement}) {
  // const { forumObject, setForumObject, formBehaviour } = useContext(FormContext)
  // const formHeader = useFormHeader({ formBehaviourType: formBehaviour.type, forumObjectType: forumObject.type })

  // const [forumObject, setForumObject] = useState<ForumObject>(initForumPost() as ForumObject)
  // const [deleteConfirmationDialogVisible, setDeleteConfirmationDialogVisible] = useState<boolean>(false)
  // const [errorVisible, setErrorVisible] = useState<boolean>(false)
  // const navigate = useNavigate()

  // useEffect(() => {
  //   setForumObject(forumObject)
  // }, [props.forumObject])

  // const defaultResponse = () => {
  //   // console.log(res)
  //   // if (formBehaviour.handleAfterSubmit) {
  //   //   formBehaviour.handleAfterSubmit()
  //   //   return
  //   // } else {
  //   //   navigate(-1)
  //   // }
  // }
  // const defaultCatch = (err: AxiosResponse) => {
  //   console.log(err)
  //   setErrorVisible(true)
  // }

  // const { mutate } = useMutation(async (props: { forumObject: ForumObject, mutateOperation: MutateOperation }) => {
  //   return mutateForumObject(props.forumObject, props.mutateOperation)
  // }, {
  //   onSuccess: () => {
  //     console.log('success')
  //     defaultResponse()
  //   },
  //   onError: (err: AxiosResponse) => {
  //     defaultCatch(err)
  //   }
  // })

  // const handleSubmit = () => {
  //   if (formBehaviour.handleSubmit) {
  //     formBehaviour.handleSubmit()
  //     return
  //   }
  //   switch (formBehaviour.type) {
  //     case 'new':
  //       return mutate({ forumObject: forumObject, mutateOperation: 'create' })
  //     case 'edit':
  //       return mutate({ forumObject: forumObject, mutateOperation: 'update' })
  //     default:
  //       break;
  //   }
  // }

  // const handleCancel = () => {
  //   if (formBehaviour.handleCancel) {
  //     formBehaviour.handleCancel()
  //   } else {
  //     if (!errorVisible) navigate(-1) // redirect to previous page
  //   }
  // }

  // const handleDelete = () => {
  //   mutate({ forumObject: forumObject, mutateOperation: 'delete' })
  // }

  // const handleDeleteConfirmationDialog = () => {
  //   setDeleteConfirmationDialogVisible(true)
  // }
  return (
    <Container>
      <Card>
        {props.formHeader && <Box sx={{ margin: 1 }}>
          <Typography variant="h5" align="center">
            {props.formHeader}
          </Typography>
        </Box>}
        {/* <DefaultFormCardTextFields forumObject={forumObject} onChangeSetState={setForumObject} /> */}

        {props.children}
        {/* Buttons
        <Box sx={{ margin: 1 }}>
          {formBehaviour.type === "new" && <Button variant='contained' sx={{ margin: 1 }}
            onClick={handleSubmit}>
            {"Create"}
          </Button>}

          {formBehaviour.type === "edit" && <Button variant='contained' sx={{ margin: 1 }}
            onClick={handleSubmit}>
            {"Update"}
          </Button>}

          {formBehaviour.type === "edit" && <Button variant='contained' sx={{
            margin: 1,
            backgroundColor: 'warning.main',
            '&:hover': {
              backgroundColor: 'warning.dark'
            }
          }}
            onClick={handleDeleteConfirmationDialog}>
            {"Delete"}
          </Button>}

          {formBehaviour.type === "login" && <Button variant='contained' sx={{ margin: 1 }}
            onClick={handleSubmit}>
            {"Login"}
          </Button>}

          {formBehaviour.type === "login" && <Button variant='contained' sx={{ margin: 1 }}
            onClick={() => { navigate('/register') }}>
            {"Register"}
          </Button>}


          {formBehaviour.type === "register" && <Button variant='contained' sx={{ margin: 1 }}
            onClick={handleSubmit}>
            {"Register"}
          </Button>}

          {formBehaviour.type === "logout" && <Button variant='contained' sx={{ margin: 1 }}
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
        </Box> */}
      </Card>
    </Container>
  )
}

export default DefaultFormCard