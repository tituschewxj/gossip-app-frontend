import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Box, Button, Card, Container, TextField, Typography } from '@mui/material'

import { AxiosResponse } from 'axios'

import axios from '../api/axios'
import DefaultDialog from './DefaultDialog'
import useFormHeader from '../hooks/useFormHeader'
import DefaultTextField from './DefaultTextField'

function DefaultFormCard(props: { formBehaviour: FormBehaviour, forumObject: ForumObject }) {
  const [forumObject, setForumObject] = useState<ForumObject>({} as ForumObject)
  // const [title, setTitle] = useState<string>()
  // const [content, setContent] = useState<string>()
  const formHeader = useFormHeader({ formBehaviourType: props.formBehaviour.type, forumObjectType: props.forumObject.type })
  const [deleteConfirmationDialogVisible, setDeleteConfirmationDialogVisible] = useState<boolean>(false)
  const [errorVisible, setErrorVisible] = useState<boolean>(false)
  const navigate = useNavigate()

  useEffect(() => {
    setForumObject(props.forumObject)
    // console.log(props.forumObject)
  }, [props.forumObject, props.formBehaviour])

  const defaultResponse = (res: AxiosResponse) => {
    console.log(res)
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

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (props.formBehaviour.handleSubmit) {
      props.formBehaviour.handleSubmit()
      return
    }

    if (forumObject.type === "comment") {
      if (props.formBehaviour.type === "new") {
        axios.post(`api/v1/posts/${forumObject.post_id}/comments`, forumObject)
          .then(defaultResponse)
          .catch(defaultCatch)
      }
      if (props.formBehaviour.type === "edit") {
        axios.put(`api/v1/comments/${forumObject.id}`, forumObject)
          .then(defaultResponse)
          .catch(defaultCatch)
      }
    }
    if (forumObject.type === "post") {
      if (props.formBehaviour.type === "new") {
        axios.post(`api/v1/posts`, forumObject)
          .then(defaultResponse)
          .catch(defaultCatch)
      }
      if (props.formBehaviour.type === "edit") {
        axios.put(`api/v1/posts/${forumObject.id}`, forumObject)
          .then(defaultResponse)
          .catch(defaultCatch)
      }
    }
    // if (!errorVisible) navigate(-1) // redirect to previous page
  }

  const handleCancel = (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (props.formBehaviour.handleCancel) {
      props.formBehaviour.handleCancel()
    } else {
      if (!errorVisible) navigate(-1) // redirect to previous page
    }
  }

  const handleDelete = () => {
    if (forumObject.type === "comment") {
      axios.delete(`api/v1/comments/${forumObject.id}`)
        .then(defaultResponse)
        .catch(defaultCatch)
    }
    if (forumObject.type === "post") {
      axios.delete(`api/v1/posts/${forumObject.id}`)
        .then(defaultResponse)
        .catch(defaultCatch)
    }
    // console.log(forumObject)
    // if (!errorVisible) navigate(-1)
  }

  const handleDeleteConfirmationDialog = () => {
    setDeleteConfirmationDialogVisible(true)
    // handleDelete()
  }
  return (
    <Container>
      <Card>
        {formHeader && <Box sx={{ margin: 1 }}>
          <Typography variant="h5" align="center">
            {formHeader}
          </Typography>
        </Box>}
        <DefaultTextField
          isVisible={forumObject.hasOwnProperty("title")}
          textFieldProps={{
            label: 'Title',
            value: forumObject.title,
            onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForumObject({ ...forumObject, title: e.target.value }),
          }} />
        <DefaultTextField
          isVisible={forumObject.hasOwnProperty("content")}
          textFieldProps={{
            label: 'Content',
            value: forumObject.content,
            multiline: true,
            onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForumObject({ ...forumObject, content: e.target.value }),
          }} />
          <DefaultTextField
          isVisible={forumObject.hasOwnProperty("username")}
          textFieldProps={{
            label: 'Username',
            value: forumObject.username,
            onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForumObject({ ...forumObject, username: e.target.value }),
          }} />
          <DefaultTextField
          isVisible={forumObject.hasOwnProperty("email")}
          textFieldProps={{
            label: 'Email',
            value: forumObject.email,
            onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForumObject({ ...forumObject, email: e.target.value }),
          }} />
          <DefaultTextField
          isVisible={forumObject.hasOwnProperty("temp_password")}
          textFieldProps={{
            label: 'Password',
            value: forumObject.temp_password,
            onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForumObject({ ...forumObject, temp_password: e.target.value }),
          }} />


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

          {props.formBehaviour.type === "register" && <Button variant='contained' sx={{ margin: 1 }}
            onClick={handleSubmit}>
            {"Register"}
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