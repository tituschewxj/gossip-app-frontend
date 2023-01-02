import { Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import axios from '../api/axios'
import { getPosts } from '../api/forumApi'
import PostsList from '../components/PostsList'
// import { getPosts } from "../api/forumApi"
// import { useQuery, useQueryClient } from "react-query"

function HomePage() {
  // const [posts, setPosts] = useState<ForumPost[]>([])
  // const queryClient = useQueryClient()

  // const {
  //   isLoading, 
  //   isError,
  //   error,
  //   data: p
  // } = useQuery('posts', getPosts, {
  //   // select: data => data
  // })

  // useEffect(() => {
  //   axios.get('api/v1/posts')
  //     .then((res) => {
  //       setPosts([...(res.data)] as ForumPost[])
  //       console.log(res)
  //     }).catch(err => console.log(err))
  // }, [])
  const { data: posts } = useQuery(['all_posts'], () => getPosts());

  return (
    <Container sx={{ marginTop: 3 }}>
      {posts && <PostsList forumPost={posts} />}
    </Container>
  )
}

export default HomePage