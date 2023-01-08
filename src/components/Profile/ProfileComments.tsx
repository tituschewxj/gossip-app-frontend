import { Container, Typography } from '@mui/material'
import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { getCommentsByUsername } from '../../api/forumApi'
import CommentsList from '../CommentsList'

function ProfileComments() {
    const { username } = useParams()
    const { data: forumComments, isLoading } = useQuery('get_search_results', () => getCommentsByUsername(`${username}`), {
        enabled: username !== undefined,
    })

    return (
        <Container sx={{ marginTop: 3 }}>
            {!isLoading && forumComments && <CommentsList forumComments={forumComments} enableButtons/>}
            {!isLoading && forumComments?.length === 0 &&
                <Typography sx={{ textAlign: 'center', margin: 1 }}>
                    No results
                </Typography>}
        </Container>
    )
}

export default ProfileComments