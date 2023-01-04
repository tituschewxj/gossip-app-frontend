import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { useParams } from 'react-router-dom';
import { addComment } from '../../api/forumApi'
// import { FormContext } from '../../hooks/context';
import useUserProfile from '../../hooks/useUserProfile';
import { initForumComment } from '../../types/typeDefaults'
import DefaultFormCard from '../DefaultFormCard';
import DefaultButton from './DefaultButton';
import DefaultTextField from './DefaultTextField';

function AddCommentFormCard(props: { handleCancel: Function, handleSubmitSuccess: Function }) {
    const { post_id } = useParams();
    const { mutate: addMutate } = useMutation(async (forumComment: ForumComment) => addComment(forumComment), {
        onSuccess: () => {
            props.handleSubmitSuccess()
        }
    })
    const username = useUserProfile()?.username

    const [forumComment, setForumComment] = useState(initForumComment({ post_id: parseInt(`${post_id}`) }))
    useEffect(() => {
        console.log(`username: ${username}`)
        username && setForumComment({ ...forumComment, author: username })
    }, [username])

    return (
        <DefaultFormCard formHeader='Create Comment'>
            <>
                <DefaultTextField
                    textFieldProps={{
                        label: 'Content',
                        value: forumComment.content,
                        multiline: true,
                        onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                            setForumComment({ ...forumComment, content: e.target.value }),
                    }} />
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <DefaultButton onClick={() => addMutate(forumComment)} text='Create' />
                    <DefaultButton onClick={props.handleCancel} text='Cancel' backgroundColor='secondary' />
                </Box>
            </>
        </DefaultFormCard>
    )
}

export default AddCommentFormCard