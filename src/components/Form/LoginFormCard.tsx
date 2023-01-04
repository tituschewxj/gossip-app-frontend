import { Box } from '@mui/material'
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
        }
    })
    const navigate = useNavigate()
    const [forumUser, setForumUser] = useState(initForumUser())
    // const formContext: FormContext = {
    //     forumObject: forumPost,
    //     setForumObject: setForumPost,
    //     formBehaviour: {
    //         type: 'login',
    //         handleSubmit: () => {
    //             loginMutate(forumPost)
    //         },
    //         handleSubmitSuccess: props.handleSubmitSuccess,
    //         handleCancel: props.handleCancel,
    //     }
    // }
    return (
        // <FormContext.Provider value={formContext}>
            <DefaultFormCard formHeader='Login'>
                <>
                    <DefaultTextField
                        textFieldProps={{
                            label: 'Email',
                            value: forumUser.email,
                            onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                            setForumUser({ ...forumUser, email: e.target.value }),
                        }} />
                    <DefaultTextField
                        textFieldProps={{
                            label: 'Password',
                            value: forumUser.password,
                            onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                            setForumUser({ ...forumUser, password: e.target.value }),
                        }} />
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <DefaultButton onClick={() => loginMutate(forumUser)} text='Login' />
                        <DefaultButton onClick={() => navigate('/register')} text='Go to register' />
                        <DefaultButton onClick={props.handleCancel} text='Cancel' backgroundColor='secondary' />
                    </Box>
                </>
            </DefaultFormCard>
        // </FormContext.Provider>
    )
}

export default LoginFormCard