import { Container, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getCommentsByUsername } from "../../api/forumApi";
import CommentsList from "../Comments/CommentsList";

function ProfileComments() {
  const { username } = useParams();
  const { data: forumComments, isLoading } = useQuery(
    "get_profile_comments",
    () => getCommentsByUsername(`${username}`),
    {
      enabled: username !== undefined,
    }
  );
  useEffect(() => {
    console.log(forumComments);
  }, [forumComments]);
  return (
    <Container sx={{ marginTop: 3 }}>
      {!isLoading && forumComments && (
        <CommentsList forumComments={forumComments} enableButtons />
      )}
      {!isLoading && forumComments?.length === 0 && (
        <Typography sx={{ textAlign: "center", margin: 1 }}>
          No results
        </Typography>
      )}
    </Container>
  );
}

export default ProfileComments;
