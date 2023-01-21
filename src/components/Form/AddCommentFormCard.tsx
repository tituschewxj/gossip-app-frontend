import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useMutation } from "react-query";

import { Box } from "@mui/material";

import { addComment } from "../../api/forumApi";
import  { UserProfileContext } from "../../hooks/useUserProfile";
import { initForumComment } from "../../types/typeDefaults";
import DefaultFormCard from "./DefaultFormCard";
import DefaultButton from "./DefaultButton";
import DefaultTextField from "./DefaultTextField";
import useLoginState from "../../hooks/useLoginState";

/**
 * Displays a Card where a comment can be added into.
 * @param props 
 * @returns 
 */
export default function AddCommentFormCard(props: {
  handleCancel: Function;
  handleSubmitSuccess: Function;
}) {
  const { post_id } = useParams();
  const { mutate: addMutate } = useMutation(
    async (forumComment: ForumComment) => addComment(forumComment),
    {
      onSuccess: () => {
        props.handleSubmitSuccess();
      },
    }
  );
  const userProfileContextData = useContext(UserProfileContext);
  const isLoggedIn = useLoginState();
  const [forumComment, setForumComment] = useState(
    initForumComment({ post_id: parseInt(`${post_id}`) })
  );
  const [commentErrorMsg, setCommentErrorMsg] = useState<string>("");
  useEffect(() => {
    console.log(`username: ${userProfileContextData?.userProfile?.username}`);
    userProfileContextData?.userProfile?.username && setForumComment({ ...forumComment, author: userProfileContextData?.userProfile.username });
  }, [userProfileContextData]);

  function handleSubmit() {
    if (forumComment.content === "") {
      setCommentErrorMsg("Comment cannot be empty");
    } else {
      setCommentErrorMsg("");
      addMutate(forumComment)
    }
  }

  return (
    <DefaultFormCard>
      <>
        <DefaultTextField
          type=""
          errorMsg={commentErrorMsg}
          disabled={isLoggedIn ? false : true}
          textFieldProps={{
            label: isLoggedIn ? "Add comment" : "Log in to add a comment",
            value: forumComment.content,
            multiline: true,
            minRows: 1,
            onChange: (
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => setForumComment({ ...forumComment, content: e.target.value }),
          }}
        />
        <Box sx={{ display: "flex", justifyContent: "right" }}>
          <DefaultButton
            disabled={isLoggedIn ? false : true}
            onClick={() => handleSubmit()}
            text="Create"
          />
          <DefaultButton
            disabled={isLoggedIn ? false : true}
            onClick={() => {
              setForumComment({ ...forumComment, content: "" });
              props.handleCancel();
            }}
            text="Cancel"
            backgroundColor="secondary"
          />
        </Box>
      </>
    </DefaultFormCard>
  );
}
