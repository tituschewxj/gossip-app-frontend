import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { addPost } from '../../api/forumApi'
// import { FormContext } from '../../hooks/context';
import useUserProfile from '../../hooks/useUserProfile';
import { initForumPost } from '../../types/typeDefaults'
import DefaultFormCard from '../DefaultFormCard';
import DefaultButton from './DefaultButton';
import DefaultTextField from './DefaultTextField';

function AddPostFormCard(props: { handleCancel: Function, handleSubmitSuccess: Function }) {
    const { mutate: addMutate } = useMutation(async (forumPost: ForumPost) => addPost(forumPost), {
        onSuccess: () => {
            props.handleSubmitSuccess()
        }
    })
    const username = useUserProfile()?.username
    const [forumPost, setForumPost] = useState(initForumPost({ author: username}))

    useEffect(() => {
        console.log(`username: ${username}`)
        username && setForumPost({ ...forumPost, author: username })
    }, [username])
    // const formContext: FormContext = {
    //     forumObject: forumPost,
    //     setForumObject: setForumPost,
    //     formBehaviour: {
    //         type: 'new',
    //         handleSubmit: () => { 
    //             addMutate(forumPost)
    //         },
    //         handleSubmitSuccess: props.handleSubmitSuccess,
    //         handleCancel: props.handleCancel,
    //     }
    // }
    return (
        // <FormContext.Provider value={formContext}>
            <DefaultFormCard formHeader='Create Post'>
                <>
                    <DefaultTextField
                        textFieldProps={{
                            label: 'Title',
                            value: forumPost.title,
                            onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                                setForumPost({ ...forumPost, title: e.target.value }),
                        }} />
                    <DefaultTextField
                        textFieldProps={{
                            label: 'Content',
                            value: forumPost.content,
                            multiline: true,
                            onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                                setForumPost({ ...forumPost, content: e.target.value }),
                        }} />
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <DefaultButton onClick={() => addMutate(forumPost)} text='Create' />
                        <DefaultButton onClick={props.handleCancel} text='Cancel' backgroundColor='secondary' />
                    </Box>
                </>
            </DefaultFormCard>
        // </FormContext.Provider>
    )
}

export default AddPostFormCard