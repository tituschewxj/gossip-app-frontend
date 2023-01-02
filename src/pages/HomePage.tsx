import { Container } from '@mui/material'
import React from 'react'
import { useQuery } from 'react-query'

import { getPosts } from '../api/forumApi'
import PostsList from '../components/PostsList'

function HomePage() {
  const { data: posts } = useQuery(['all_posts'], () => getPosts());

  return (
    <Container sx={{ marginTop: 3 }}>
      {posts && <PostsList forumPost={posts} />}
    </Container>
  )
}

export default HomePage