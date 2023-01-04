import { Alert, Box } from '@mui/material'
import AlertTitle from '@mui/material/AlertTitle'
import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { userLogin } from '../../api/authenticationApi'
// import { FormContext } from '../../hooks/context'
import { initForumUser } from '../../types/typeDefaults'
import DefaultFormCard from '../DefaultFormCard'
import DefaultButton from './DefaultButton'
import DefaultTextField from './DefaultTextField'

function LoginFormCard(props: { handleCancel: Function, handleSubmitSuccess: Function }) {
    const { mutate: loginMutate } = useMutation(async (forumUser: ForumUser) => userLogin(forumUser), {
        onSuccess: () => {
            props.handleSubmitSuccess()
        },
        onError: () => {
            setError(true)
        }
    })
    const navigate = useNavigate()
    const [forumUser, setForumUser] = useState(initForumUser())
    const [error, setError] = useState(false)
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const handleSubmit = () => {
        setEmailError(forumUser.email === '' ? 'Email cannot be empty' : '')
        setPasswordError(forumUser.password === '' ? 'Password cannot be empty' : '')
        if (forumUser.email !== '' && forumUser.password !== '') {
            loginMutate(forumUser)
            return
        }
    }

    return (
        <DefaultFormCard formHeader='Login'>
            <>
                <DefaultTextField
                    errorMsg={emailError}
                    textFieldProps={{
                        label: 'Email',
                        value: forumUser.email,
                        onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                            setForumUser({ ...forumUser, email: e.target.value }),
                    }} />
                <DefaultTextField
                    errorMsg={passwordError}
                    textFieldProps={{
                        label: 'Password',
                        value: forumUser.password,
                        onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                            setForumUser({ ...forumUser, password: e.target.value }),
                    }} />
                {error && <Alert severity='error' sx={{ margin: 1 }}>
                    <AlertTitle>Error occured</AlertTitle>
                    Invalid email or password
                </Alert>}
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <DefaultButton onClick={handleSubmit} text='Login' />
                    <DefaultButton onClick={() => navigate('/register')} text='Go to register' />
                    <DefaultButton onClick={props.handleCancel} text='Cancel' backgroundColor='secondary' />
                </Box>
            </>
        </DefaultFormCard>
    )
}

export default LoginFormCard