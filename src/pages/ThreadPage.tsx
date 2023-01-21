import React, { useState } from "react";
import Post from "../components/Posts/Post";

import { useParams } from "react-router-dom";

import { Box } from "@mui/material";
import Container from "@mui/material/Container";
import DefaultDialog from "../components/Notifications/DefaultDialog";
import { useQuery } from "react-query";
import { getComments, getPost } from "../api/forumApi";
import AddCommentFormCard from "../components/Form/AddCommentFormCard";
import CommentsList from "../components/Comments/CommentsList";

/**
 * ThreadPage component displays a single post and it's comments in a page.
 * It also displays a comment box to add a comment.
 * @returns 
 */
export default function ThreadPage() {
  const { post_id } = useParams();
  const [errorVisible, setErrorVisible] = useState<boolean>(false);

  const { data: postWithTags } = useQuery("post", () => getPost(`${post_id}`));
  const { data: comments } = useQuery("post_comments", () =>
    getComments(`${post_id}`)
  );

  return (
    <Container sx={{ marginTop: 3 }}>
      {postWithTags && (
        <Post
          forumPost={postWithTags.post}
          disabledClickable
          tags={postWithTags.tags}
        />
      )}
      <Box sx={{ margin: 1 }}>
        <AddCommentFormCard
          handleCancel={() => {}}
          handleSubmitSuccess={() => {
            window.location.reload();
          }}
        />
      </Box>
      {comments && <CommentsList forumComments={comments} />}
      <DefaultDialog
        open={errorVisible}
        dialogBehaviour={{
          type: "error",
          handleClose: () => setErrorVisible(false),
        }}
      />
    </Container>
  );
}