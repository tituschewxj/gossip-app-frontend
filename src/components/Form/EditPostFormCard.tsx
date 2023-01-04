import { Box } from '@mui/material';
import React, { useState } from 'react'
import { useMutation } from 'react-query'

import { deletePost, updatePost } from '../../api/forumApi'
// import { FormContext } from '../../hooks/context';
import DefaultFormCard from '../DefaultFormCard';
import DefaultButton from './DefaultButton';
import DefaultTextField from './DefaultTextField';

function EditPostFormCard(props: { forumPost: ForumPost, handleCancel: Function, handleSubmitSuccess: Function }) {
    const { mutate: updateMutate } = useMutation(async (forumPost: ForumPost) => updatePost(forumPost), {
        onSuccess: () => {
            props.handleSubmitSuccess()
        }
    })
    const { mutate: deleteMutate } = useMutation(async (forumPost: ForumPost) => deletePost(`${forumPost.id}`))

    const [forumPost, setForumPost] = useState(props.forumPost)

    return (
        <DefaultFormCard formHeader='Update Post'>
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
                    <DefaultButton onClick={() => updateMutate(forumPost)} text='Update' />
                    <DefaultButton onClick={() => deleteMutate(forumPost)} text='Delete' />
                    <DefaultButton onClick={props.handleCancel} text='Cancel' backgroundColor='secondary' />
                </Box>
            </>
        </DefaultFormCard>
    )
}

export default EditPostFormCard