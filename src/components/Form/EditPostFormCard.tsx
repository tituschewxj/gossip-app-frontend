import { Box } from '@mui/material';
import { MuiChipsInput } from 'mui-chips-input';
import React, { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { forEachChild } from 'typescript';

import { addPostTag, deletePost, deletePostsTagByPostIdAndTagName, getTagsByPostId, updatePost } from '../../api/forumApi'
import { initForumPostsTag } from '../../types/typeDefaults';
// import { FormContext } from '../../hooks/context';
import DefaultFormCard from '../DefaultFormCard';
import DefaultButton from './DefaultButton';
import DefaultTextField from './DefaultTextField';

function EditPostFormCard(props: { forumPost: ForumPost, handleCancel: Function, handleSubmitSuccess: Function }) {
    const { mutate: updateMutate } = useMutation(async (forumPost: ForumPost) => updatePost(forumPost), {
        onSuccess: (res) => {
            // adds the newly created tags and removed deleted tags into the database
            chips.forEach(chip => {
                if (!initTags.delete(chip)) {
                    addPostsTagMutate(initForumPostsTag({ tag_name: chip, post_id: res.data.id }))
                }
            })
            initTags.forEach(tagName => deleteTagMutate(tagName))
            props.handleSubmitSuccess()
        }
    })
    const { mutate: addPostsTagMutate } = useMutation(async (postsTag: ForumPostsTag) => {
        return addPostTag(postsTag)
    }, {
        onSuccess: (res) => {
            // console.log(res)
            props.handleSubmitSuccess()
        }
    })
    const { mutate: deleteMutate } = useMutation(async (forumPost: ForumPost) => deletePost(`${forumPost.id}`))
    const { mutate: deleteTagMutate } = useMutation(async (tagName: string) => {
        if (props.forumPost.id) {
            deletePostsTagByPostIdAndTagName(props.forumPost.id, tagName)
        }
    })
    


    const [initTags, setInitTags] = useState<Set<string>>(new Set())
    useQuery(`get_tag_for_post_${props.forumPost.id}`, () => getTagsByPostId(parseInt(`${props.forumPost.id}`)), {
      onSuccess: (res: ForumTag[]) => {
        setInitTags(new Set(res.map(tag => tag.name)))
        setChips(res.map(tag => tag.name))
      }
    })

    const [forumPost, setForumPost] = useState(props.forumPost)
    const [chips, setChips] = useState<string[]>([])

    const handleNewChip = (newChips: string[]) => {
        newChips = newChips.map(chip => chip[0].toUpperCase() + chip.substring(1).toLowerCase())
        setChips([...new Set(newChips)] as string[])
    }
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
                <Box sx={{ margin: 1 }}>
                    <MuiChipsInput label={'Tags'} fullWidth value={chips} onChange={handleNewChip} />
                </Box>
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