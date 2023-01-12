import { Container, Typography } from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getPostsByUsername } from "../../api/forumApi";
import PostsList from "../Posts/PostsList";

function ProfilePosts() {
  const { username } = useParams();
  const { data: posts, isLoading } = useQuery(
    "get_profile_posts",
    () => getPostsByUsername(`${username}`),
    {
      enabled: username !== undefined,
    }
  );

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

export default ProfilePosts;
