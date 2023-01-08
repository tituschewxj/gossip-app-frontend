import { Box } from '@mui/material';
import React, { useState } from 'react'
import { useMutation } from 'react-query'

import { deleteComment, updateComment } from '../../api/forumApi'

import DefaultFormCard from './DefaultFormCard';
import DefaultButton from './DefaultButton';
import DefaultTextField from './DefaultTextField';

function EditCommentFormCard(props: { forumComment: ForumComment, handleCancel: Function, handleSubmitSuccess: Function }) {
    const { mutate: updateMutate } = useMutation(async (forumComment: ForumComment) => updateComment(forumComment), {
        onSuccess: () => {
            props.handleSubmitSuccess()
        }
    })
    const { mutate: deleteMutate } = useMutation(async (forumComment: ForumComment) => deleteComment(`${forumComment.id}`))

    const [forumComment, setForumComment] = useState(props.forumComment)

    return (
        <DefaultFormCard formHeader='Update Comment'>
            <>
                <DefaultTextField
                    type=''
                    textFieldProps={{
                        label: 'Content',
                        value: forumComment.content,
                        multiline: true,
                        onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                            setForumComment({ ...forumComment, content: e.target.value }),
                    }} />
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <DefaultButton onClick={() => updateMutate(forumComment)} text='Update' />
                    <DefaultButton onClick={() => deleteMutate(forumComment)} text='Delete' />
                    <DefaultButton onClick={props.handleCancel} text='Cancel' backgroundColor='secondary' />
                </Box>
            </>
        </DefaultFormCard >
    )
}

export default EditCommentFormCard