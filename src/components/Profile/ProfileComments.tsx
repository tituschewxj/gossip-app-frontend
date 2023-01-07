import { Container, Typography } from '@mui/material'
import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { getCommentsByUsername } from '../../api/forumApi'
import PostsList from '../PostsList'

function ProfileComments() {
    const { username } = useParams()
    const { data: forumPosts, isLoading } = useQuery('get_search_results', () => getCommentsByUsername(`${username}`), {
        enabled: username !== undefined,
        keepPreviousData: true
    })

    return (
        <Container sx={{ marginTop: 3 }}>
            {!isLoading && forumPosts && <PostsList forumPost={forumPosts} />}
            {!isLoading && forumPosts?.length === 0 &&
                <Typography sx={{ textAlign: 'center', margin: 1 }}>
                    No results
                </Typography>}
        </Container>
    )
}

export default ProfileComments