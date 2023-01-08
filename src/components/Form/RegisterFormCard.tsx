import { Box } from '@mui/material'
import React, { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { userSignup } from '../../api/authenticationApi'
import { addProfile, getUsernames } from '../../api/forumApi'
import { initForumRegister } from '../../types/typeDefaults'
import DefaultFormCard from './DefaultFormCard'
import DefaultButton from './DefaultButton'
import DefaultTextField from './DefaultTextField'

function RegisterFormCard(props: { handleCancel: Function, handleSubmitSuccess: Function }) {
    const [forumRegister, setForumRegister] = useState<ForumRegister>(initForumRegister())
    const { mutate: userMutate } = useMutation(async (forumUser: ForumUser) => userSignup(forumUser),
        {
            onSuccess: (user_id) => {
                addProfileMutate({
                    type: 'profile',
                    username: forumRegister.username,
                    user_id: user_id,
                    description: '',
                } as ForumProfile)
                // props.handleSubmitSuccess()
            },
            onError: () => {
                setError(true)
            }
        })
    const { mutate: addProfileMutate } = useMutation(async (forumProfile: ForumProfile) => addProfile(forumProfile))
    const { data: usernames } = useQuery('get_usernames', () => getUsernames())
    const navigate = useNavigate()

    const [emailError, setEmailError] = useState<boolean>(false)
    const [usernameError, setUsernameError] = useState<string>('')
    const [passwordError, setPasswordError] = useState<string>('')
    const [confirmPasswordError, setConfirmPasswordError] = useState<string>('')
    const [error, setError] = useState<boolean>(false)


    const onSubmitRegister = () => {
        setError(false)
        setEmailError(forumRegister.email === '')
        console.log(usernames)
        if (forumRegister.username === '') {
            setUsernameError('Username cannot be empty')
        } else if (usernames.filter((username: string) => username === forumRegister.username).length !== 0) {
            setUsernameError('Username taken')
        } else {
            setUsernameError('')
        }
        if (forumRegister.password !== forumRegister.confirm_password) {
            setPasswordError('Password not identical')
            setConfirmPasswordError('Password not identical')
        } else {
            setPasswordError(forumRegister.password === '' ? 'Password cannot be empty' : '')
            setConfirmPasswordError(forumRegister.confirm_password === '' ? 'Confirm Password cannot be empty' : '')
        }


        userMutate({
            email: forumRegister.email,
            password: forumRegister.password,
        } as ForumUser)
    }

    return (
        <DefaultFormCard formHeader='Register' errorMsg={error ? 'Invalid Registration' : ''} buttons={
            <>
                <DefaultButton onClick={onSubmitRegister} text='Register' />
                <DefaultButton onClick={() => navigate('/login')} text='Go to login' />
                <DefaultButton onClick={props.handleCancel} text='Cancel' backgroundColor='secondary' />
            </>
        }>
            <>
                <DefaultTextField
                    type='email'
                    emptyError={emailError}
                    textFieldProps={{
                        label: 'Email',
                        value: forumRegister.email,
                        onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                            setForumRegister({ ...forumRegister, email: e.target.value }),
                    }} />
                <DefaultTextField
                    type=''
                    errorMsg={usernameError}
                    textFieldProps={{
                        label: 'Username',
                        value: forumRegister.username,
                        onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                            setForumRegister({ ...forumRegister, username: e.target.value }),
                    }} />
                <DefaultTextField
                    type='password'
                    errorMsg={passwordError}
                    textFieldProps={{
                        label: 'Password',
                        value: forumRegister.password,
                        onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                            setForumRegister({ ...forumRegister, password: e.target.value }),
                    }} />
                <DefaultTextField
                    type='password'
                    errorMsg={confirmPasswordError}
                    textFieldProps={{
                        label: 'Confirm Password',
                        value: forumRegister.confirm_password,
                        onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                            setForumRegister({ ...forumRegister, confirm_password: e.target.value }),
                    }} />
            </>
        </DefaultFormCard>
    )
}

export default RegisterFormCard