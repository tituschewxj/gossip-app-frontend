import React, { useContext, useEffect, useState } from "react";

import { useMutation } from "react-query";

import { Box } from "@mui/material";
import { MuiChipsInput } from "mui-chips-input";

import { addPost, addPostTag } from "../../api/forumApi";
import { UserProfileContext } from "../../hooks/useUserProfile";
import { initForumPost, initForumPostsTag } from "../../types/typeDefaults";
import DefaultFormCard from "./DefaultFormCard";
import DefaultButton from "./DefaultButton";
import DefaultTextField from "./DefaultTextField";

/**
 * Displays a card where posts can be added into
 * @param props 
 * @returns 
 */
export default function AddPostFormCard(props: {
  handleCancel: Function;
  handleSubmitSuccess: Function;
}) {
  const { mutate: addMutate } = useMutation(
    async (forumPost: ForumPost) => addPost(forumPost),
    {
      onSuccess: (res) => {
        // console.log(res)
        addPostsTagsMutate(
          chips.map((chip: string) =>
            initForumPostsTag({ tag_name: chip, post_id: res.data.id })
          )
        );
      },
    }
  );
  const { mutate: addPostsTagsMutate } = useMutation(
    async (postTags: ForumPostsTag[]) => {
      return postTags.map((postTag) => addPostTag(postTag));
    },
    {
      onSuccess: (res) => {
        // console.log(res)
        props.handleSubmitSuccess();
      },
    }
  );
  const userProfileContextData = useContext(UserProfileContext);
  const [forumPost, setForumPost] = useState(
    initForumPost({ author: userProfileContextData?.userProfile?.username })
  );
  const [chips, setChips] = useState<string[]>([]);

  useEffect(() => {
    // console.log(`username: ${username}`)
    userProfileContextData?.userProfile?.username && setForumPost({ ...forumPost, author: userProfileContextData?.userProfile.username });
  }, [userProfileContextData]);

  const handleNewChip = (newChips: string[]) => {
    // newChips = newChips.map(chip => chip[0].toUpperCase() + chip.substring(1).toLowerCase())
    setChips([...new Set(newChips)] as string[]);
  };

  const [titleErrorMsg, setTitleErrorMsg] = useState<string>("")
  const [contentErrorMsg, setContentErrorMsg] = useState<string>("")


  function handleSubmit() {
    let hasError = false;
    if (forumPost.title === "") {
      hasError = true;
      setTitleErrorMsg("Title cannot be empty");
    } else {
      setTitleErrorMsg("")
    }
    if (forumPost.content === "") {
      hasError = true;
      setContentErrorMsg("Content cannot be empty");
    } else {
      setContentErrorMsg("");
    }
    if (!hasError) {
      addMutate(forumPost);
    }
  }
  return (
    <DefaultFormCard formHeader="Create Post">
      <>
        <DefaultTextField
          type=""
          errorMsg={titleErrorMsg}
          textFieldProps={{
            label: "Title",
            value: forumPost.title,
            onChange: (
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => setForumPost({ ...forumPost, title: e.target.value }),
          }}
        />
        <DefaultTextField
          type=""
          errorMsg={contentErrorMsg}
          textFieldProps={{
            label: "Content",
            value: forumPost.content,
            multiline: true,
            onChange: (
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => setForumPost({ ...forumPost, content: e.target.value }),
          }}
        />
        <Box sx={{ margin: 1 }}>
          <MuiChipsInput
            label={"Tags"}
            fullWidth
            value={chips}
            onChange={handleNewChip}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <DefaultButton onClick={() => handleSubmit()} text="Create" />
          <DefaultButton
            onClick={props.handleCancel}
            text="Cancel"
            backgroundColor="secondary"
          />
        </Box>
      </>
    </DefaultFormCard>
  );
}