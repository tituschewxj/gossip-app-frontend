import { Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from '../api/axios'
import PostsList from '../components/PostsList'
import { getPosts } from "../api/forumApi"
import { useQuery, useQueryClient } from "react-query"

function HomePage() {
  const [posts, setPosts] = useState<ForumPost[]>([])
  // const queryClient = useQueryClient()

  // const {
  //   isLoading, 
  //   isError,
  //   error,
  //   data: p
  // } = useQuery('posts', getPosts, {
  //   // select: data => data
  // })

  useEffect(() => {
    axios.get('api/v1/posts')
      .then((res) => {
        setPosts([...(res.data)] as ForumPost[])
        console.log(res)
      }).catch(err => console.log(err))
  }, [])

  return (
    <Container sx={{ marginTop: 3 }}>
      <PostsList forumPost={posts} />
    </Container>
  )
}

export default HomePage