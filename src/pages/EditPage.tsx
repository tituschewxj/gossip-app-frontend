import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Container } from "@mui/system";
import { useQuery } from "react-query";

import { initForumPost } from "../types/typeDefaults";
import { getComment, getPost } from "../api/forumApi";
import EditCommentFormCard from "../components/Form/EditCommentFormCard";
import EditPostFormCard from "../components/Form/EditPostFormCard";
import AddPostFormCard from "../components/Form/AddPostFormCard";
import EditProfile from "../components/Form/EditProfile";
import { useErrorState } from "../hooks/useErrorState";
import useUserProfile from "../hooks/useUserProfile";

function EditPage(props: { editType: FormBehaviourType }) {
  // Page for editing a post/comment
  const { post_id, comment_id } = useParams();
  const navigate = useNavigate();
  const userProfile = useUserProfile();
  const { setHasError, setErrorMsg } = useErrorState();

  useQuery(
    "edit_forumobject",
    () => {
      if (comment_id) {
        return getComment(comment_id);
      }
      if (post_id) {
        return getPost(post_id);
      }
      return (async (): Promise<ForumObject> => initForumPost())();
    },
    {
      onSuccess: (res) => {
        setForumObject(res);
      },
      onError: () => {
        setHasError(true);
        setErrorMsg("Unable to edit content");
      },
    }
  );
  const [forumObject, setForumObject] = useState<ForumObject>();

  return (
    <Container sx={{ marginTop: 3 }}>
      {forumObject && forumObject.profile_id && userProfile.id && (
        <>
          {userProfile.id === forumObject.profile_id ? (
            <>
              {forumObject.type === "comment" && props.editType === "edit" && (
                <EditCommentFormCard
                  forumComment={forumObject}
                  handleCancel={() => navigate(-1)}
                  handleSubmitSuccess={() => {}}
                />
              )}
              {forumObject.type === "post_with_tags" &&
                props.editType === "edit" && (
                  <EditPostFormCard
                    forumPost={forumObject.post}
                    handleCancel={() => navigate(-1)}
                    handleSubmitSuccess={() => navigate("/")}
                  />
                )}
              {forumObject.type === "post" && props.editType === "new" && (
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
          ) : (
            <p>Not authorized</p>
          )}
        </>
      )}
    </Container>
  );
}

export default EditPage;
