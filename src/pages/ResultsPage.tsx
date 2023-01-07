import { Typography } from '@mui/material'
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useLocation, useSearchParams } from 'react-router-dom'
import { getPostsByTagNames } from '../api/forumApi'
import PostsList from '../components/PostsList'

function ResultsPage() {
  // the page where search results are shown
  const [searchParams] = useSearchParams()
  const { data: forumPosts, refetch, isLoading } = useQuery('get_search_results', () => getPostsByTagNames(searchParams.getAll('tags')))
  useEffect(() => {
    refetch()
  }, [searchParams])

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

export default ResultsPage