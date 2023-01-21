import React from "react";
import { useNavigate } from "react-router-dom";

import { Container } from "@mui/system";

import EditCommentFormCard from "../components/Form/EditCommentFormCard";
import EditPostFormCard from "../components/Form/EditPostFormCard";
import AddPostFormCard from "../components/Form/AddPostFormCard";
import EditProfile from "../components/Form/EditProfile";

/**
 * EditPage is the page for editing a post/comment, creating a new post, 
 * or editing profile information.
 * @param props 
 * @returns 
 */

export default function EditPage(props: { editType: FormBehaviourType }) {
  const navigate = useNavigate();

  return (
    <Container sx={{ marginTop: 3 }}>
      <>
        {props.editType === "edit_comment" && (
          <EditCommentFormCard
            handleCancel={() => navigate(-1)}
            handleSubmitSuccess={() => navigate(-1)}
          />
        )}
        {props.editType === "edit_post" && (
            <EditPostFormCard
              handleCancel={() => navigate(-1)}
              handleSubmitSuccess={() => navigate(-1)}
            />
          )}
        {props.editType === "new_post" && (
          <AddPostFormCard
            handleCancel={() => navigate(-1)}
            handleSubmitSuccess={() => navigate("/")}
          />
        )}
        {props.editType === "edit_profile" && (
          <EditProfile
            handleCancel={() => navigate(-1)}
            handleSubmitSuccess={() => navigate("/")}
          />
        )}
      </>
    </Container>
  );
}