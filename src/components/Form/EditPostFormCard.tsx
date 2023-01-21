import { Box } from "@mui/material";
import { MuiChipsInput } from "mui-chips-input";
import React, { useContext, useState } from "react";
import { useMutation, useQuery } from "react-query";

import {
  addPostTag,
  deletePost,
  deletePostsTagByPostIdAndTagName,
  getPost,
  updatePost,
} from "../../api/forumApi";

import { initForumPostsTag } from "../../types/typeDefaults";
import DefaultFormCard from "./DefaultFormCard";
import DefaultButton from "./DefaultButton";
import DefaultTextField from "./DefaultTextField";
import { UserProfileContext } from "../../hooks/useUserProfile";
import { useParams } from "react-router-dom";

/**
 * The form card for editing a post.
 * @param props 
 * @returns 
 */
export default function EditPostFormCard(props: {
  handleCancel: Function;
  handleSubmitSuccess: Function;
}) {
  const { post_id } = useParams();
  useQuery("edit_post", () => getPost(`${post_id}`), {
    onSuccess: (res: ForumPostWithTags) => {
      if (!userProfileContextData || res.post.profile_id !== userProfileContextData.userProfile?.id) {
        // not authorized
        console.log('not authorized');
        return;
      }
      setForumPost(res.post);
      setInitTags(new Set(res.tags.map((tag) => tag.name)));
      setChips(res.tags.map((tag) => tag.name));
    }
  });

  const { mutate: updateMutate } = useMutation(
    async (forumPost: ForumPost) => updatePost(forumPost),
    {
      onSuccess: (res) => {
        // adds the newly created tags and removed deleted tags into the database
        chips.forEach((chip) => {
          if (!initTags.delete(chip)) {
            addPostsTagMutate(
              initForumPostsTag({ tag_name: chip, post_id: res.data.id })
            );
          }
        });
        initTags.forEach((tagName) => deleteTagMutate(tagName));
        props.handleSubmitSuccess();
      },
    }
  );
  const { mutate: addPostsTagMutate } = useMutation(
    async (postsTag: ForumPostsTag) => {
      return addPostTag(postsTag);
    },
    {
      onSuccess: (res) => {
        // console.log(res)
        // props.handleSubmitSuccess()
      },
    }
  );
  const { mutate: deleteMutate } = useMutation(async (forumPost: ForumPost) =>
    deletePost(`${forumPost.id}`), 
    {
      onSuccess: () => {
        props.handleCancel();
      }
    }
  );
  const { mutate: deleteTagMutate } = useMutation(async (tagName: string) => {
    if (forumPost && forumPost.id) {
      deletePostsTagByPostIdAndTagName(forumPost.id, tagName);
    }
  });

  const userProfileContextData = useContext(UserProfileContext);
  const [forumPost, setForumPost] = useState<ForumPost>();
  const [initTags, setInitTags] = useState<Set<string>>(new Set());
  const [chips, setChips] = useState<string[]>([]);

  const handleNewChip = (newChips: string[]) => {
    setChips([...new Set(newChips)] as string[]);
  };

  return (
    <>
      {forumPost ? <DefaultFormCard formHeader="Update Post">
        <>
          <DefaultTextField
            type=""
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
            <DefaultButton
              onClick={() => updateMutate(forumPost)}
              text="Update"
            />
            <DefaultButton
              onClick={() => deleteMutate(forumPost)}
              text="Delete"
            />
            <DefaultButton
              onClick={props.handleCancel}
              text="Cancel"
              backgroundColor="secondary"
            />
          </Box>
        </>
      </DefaultFormCard> : <p>loading</p>
      }
    </>
  );
}
