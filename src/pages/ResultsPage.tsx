import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { getPostsByTagNames } from "../api/forumApi";
import PostsList from "../components/Posts/PostsList";

function ResultsPage() {
  // the page where search results are shown
  const [searchParams] = useSearchParams();
  const {
    data: posts,
    refetch,
    isLoading,
  } = useQuery("get_search_results", () =>
    getPostsByTagNames(searchParams.getAll("tags"))
  );
  useEffect(() => {
    refetch();
  }, [searchParams, refetch]);

  return (
    <Container sx={{ marginTop: 3 }}>
      {!isLoading && posts && <PostsList forumPostsData={posts} />}
      {!isLoading && posts?.posts.length === 0 && (
        <Typography sx={{ textAlign: "center", margin: 1 }}>
          No results
        </Typography>
      )}
    </Container>
  );
}

export default ResultsPage;
