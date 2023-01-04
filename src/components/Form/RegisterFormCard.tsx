import { Box } from '@mui/material'
import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { userSignup } from '../../api/authenticationApi'
import { addProfile } from '../../api/forumApi'
import { initForumRegister } from '../../types/typeDefaults'
import DefaultFormCard from '../DefaultFormCard'
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
                props.handleSubmitSuccess()
            }
        })
    const { mutate: addProfileMutate } = useMutation(async (forumProfile: ForumProfile) => addProfile(forumProfile))
    const navigate = useNavigate()
    const onSubmitRegister = () => {
        if (forumRegister.password !== forumRegister.confirm_password) {
            console.log('password not identical')
            return
        }
        userMutate({
            email: forumRegister.email,
            password: forumRegister.password,
        } as ForumUser)
    }

    return (
        <DefaultFormCard formHeader='Login'>
            <>
                <DefaultTextField
                    textFieldProps={{
                        label: 'Email',
                        value: forumRegister.email,
                        onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                            setForumRegister({ ...forumRegister, email: e.target.value }),
                    }} />
                <DefaultTextField
                    textFieldProps={{
                        label: 'Username',
                        value: forumRegister.username,
                        onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                            setForumRegister({ ...forumRegister, username: e.target.value }),
                    }} />
                <DefaultTextField
                    textFieldProps={{
                        label: 'Password',
                        value: forumRegister.password,
                        onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                            setForumRegister({ ...forumRegister, password: e.target.value }),
                    }} />
                <DefaultTextField
                    textFieldProps={{
                        label: 'Confirm Password',
                        value: forumRegister.confirm_password,
                        onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                            setForumRegister({ ...forumRegister, confirm_password: e.target.value }),
                    }} />
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <DefaultButton onClick={onSubmitRegister} text='Register' />
                    <DefaultButton onClick={() => navigate('/login')} text='Go to login' />
                    <DefaultButton onClick={props.handleCancel} text='Cancel' backgroundColor='secondary' />
                </Box>
            </>
        </DefaultFormCard>
    )
}

export default RegisterFormCard