import { Box, CircularProgress, Container, Pagination } from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

import { getPosts } from "../api/forumApi";
import PostsList from "../components/Posts/PostsList";

/**
 * Home page is the default page that is shown to the user.
 * which contains all posts, paginated.
 * @returns 
 */
export default function HomePage() {
  const navigate = useNavigate();
  const { page } = useParams();
  const { data: posts, isLoading } = useQuery(
    ["all_posts", page],
    () => getPosts(page ? parseInt(page) : 1),
    {
      keepPreviousData: true,
      staleTime: 5000,
    }
  );

  function handleUpdatePage(page: number) {
    navigate(`/page/${page}`);
    window.scrollTo(0, 0);
  }

  return (
    <Container sx={{ marginTop: 3 }}>
      {posts && <PostsList forumPostsData={posts} />}
      {!isLoading && (
        <Box sx={{ margin: 3, justifyContent: "center", display: "flex" }}>
          <Pagination
            count={
              posts
                ? Math.ceil(posts?.meta.totalPosts / posts?.meta.postsPerPage)
                : 1
            }
            color="primary"
            boundaryCount={2}
            siblingCount={2}
            onChange={(e, v) => {
              handleUpdatePage(v);
            }}
            page={page ? parseInt(page) : 1}
          ></Pagination>
        </Box>
      )}
      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
}
