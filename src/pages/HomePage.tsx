import { Box, CircularProgress, Container, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

import { getPosts } from "../api/forumApi";
import PostsList from "../components/Posts/PostsList";

/**
 * Home page is the default page that is shown to the user.
 * @returns 
 */
export default function HomePage() {
  // Home page for all posts with pagination
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState(1);
  const { data: posts, isLoading } = useQuery(
    ["all_posts", activePage],
    () => getPosts(activePage),
    {
      keepPreviousData: true,
      staleTime: 5000,
    }
  );
  const { page } = useParams();

  useEffect(() => {
    // queryClient.prefetchQuery(['all_posts', activePage], () => getPosts(activePage))
    navigate(`/page/${activePage}`);
  }, [activePage, queryClient, navigate]);

  useEffect(() => {
    if (page) {
      setActivePage(parseInt(page));
    }
  }, [page]);

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
            onChange={(e, v) => setActivePage(v)}
            page={activePage}
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
