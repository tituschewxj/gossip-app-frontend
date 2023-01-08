import { Container, Typography } from '@mui/material'
import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { getPostsByUsername } from '../../api/forumApi'
import PostsList from '../PostsList'

function ProfilePosts() {
    const { username } = useParams()
    const { data: forumPosts, isLoading } = useQuery('get_search_results', () => getPostsByUsername(`${username}`), {
        enabled: username !== undefined,
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

export default ProfilePosts