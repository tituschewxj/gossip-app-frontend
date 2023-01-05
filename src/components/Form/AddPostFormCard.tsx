import { Box } from '@mui/material';
import { MuiChipsInput } from 'mui-chips-input';
import React, { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { addPost, addPostTag } from '../../api/forumApi'
import useUserProfile from '../../hooks/useUserProfile';
import { initForumPost, initForumPostsTag } from '../../types/typeDefaults'
import DefaultFormCard from '../DefaultFormCard';
import DefaultButton from './DefaultButton';
import DefaultTextField from './DefaultTextField';

function AddPostFormCard(props: { handleCancel: Function, handleSubmitSuccess: Function }) {
    const { mutate: addMutate } = useMutation(async (forumPost: ForumPost) => addPost(forumPost), {
        onSuccess: (res) => {
            // console.log(res)
            addPostsTagsMutate(chips.map((chip: string) => initForumPostsTag({ tag_name: chip, post_id: res.data.id })))
        }
    })
    const { mutate: addPostsTagsMutate } = useMutation(async (postTags: ForumPostsTag[]) => {
        return postTags.map(postTag => addPostTag(postTag))
    }, {
        onSuccess: (res) => {
            // console.log(res)
            props.handleSubmitSuccess()
        }
    })
    const username = useUserProfile()?.username
    const [forumPost, setForumPost] = useState(initForumPost({ author: username }))
    const [chips, setChips] = useState<string[]>([])

    useEffect(() => {
        // console.log(`username: ${username}`)
        username && setForumPost({ ...forumPost, author: username })
    }, [username])

    const handleNewChip = (newChips: string[]) => {
        newChips = newChips.map(chip => chip[0].toUpperCase() + chip.substring(1).toLowerCase())
        setChips([...new Set(newChips)] as string[])
    }
    return (
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
                <Box sx={{ margin: 1 }}>
                    <MuiChipsInput label={'Tags'} fullWidth value={chips} onChange={handleNewChip} />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <DefaultButton onClick={() => addMutate(forumPost)} text='Create' />
                    <DefaultButton onClick={props.handleCancel} text='Cancel' backgroundColor='secondary' />
                </Box>
            </>
        </DefaultFormCard>
    )
}
export default AddPostFormCard