import { Box } from "@mui/material";
import React, { useContext, useState } from "react";
import { useMutation, useQuery } from "react-query";

import { deleteComment, getComment, updateComment } from "../../api/forumApi";

import DefaultFormCard from "./DefaultFormCard";
import DefaultButton from "./DefaultButton";
import DefaultTextField from "./DefaultTextField";
import { useParams } from "react-router-dom";
import { UserProfileContext } from "../../hooks/useUserProfile";

/**
 * The card to edit comment in EditPage.
 * @param props 
 * @returns 
 */
function EditCommentFormCard(props: {
  handleCancel: Function;
  handleSubmitSuccess: Function;
}) {
  const { comment_id } = useParams();
  const userProfileContextData = useContext(UserProfileContext);
  useQuery("get-forum-comment", () => getComment(`${comment_id}`), {
    onSuccess: (res: ForumComment) => {
      if (userProfileContextData && res.profile_id !== userProfileContextData.userProfile?.id) {
        console.log("not authorized");
        return;
      }
      // console.log(res);
      setForumComment(res);
    }
  })
  const { mutate: updateMutate } = useMutation(
    async (forumComment: ForumComment) => updateComment(forumComment),
    {
      onSuccess: () => {
        props.handleSubmitSuccess();
      },
    }
  );
  const { mutate: deleteMutate } = useMutation(
    async (forumComment: ForumComment) => deleteComment(`${forumComment.id}`), 
    {
      onSuccess: () => {
        props.handleSubmitSuccess();
      }
    }
  );

  const [forumComment, setForumComment] = useState<ForumComment>();

  return (
    <>
      {forumComment ?
        <DefaultFormCard formHeader="Update Comment">
          <>
            <DefaultTextField
              type=""
              textFieldProps={{
                label: "Content",
                value: forumComment.content,
                multiline: true,
                onChange: (
                  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => setForumComment({ ...forumComment, content: e.target.value }),
              }}
            />
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <DefaultButton
                onClick={() => updateMutate(forumComment)}
                text="Update"
              />
              <DefaultButton
                onClick={() => deleteMutate(forumComment)}
                text="Delete"
              />
              <DefaultButton
                onClick={props.handleCancel}
                text="Cancel"
                backgroundColor="secondary"
              />
            </Box>
          </>
        </DefaultFormCard> : <p>loading</p>}
    </>
  );
}

export default EditCommentFormCard;
