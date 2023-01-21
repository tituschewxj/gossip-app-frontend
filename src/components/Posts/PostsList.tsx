import React from "react";

import Post from "./Post";

/**
 * PostsList component displays a list of posts
 * @param props 
 * @returns 
 */
export default function PostsList(props: { forumPostsData: ForumPostsData }) {
  return (
    <>
      {props.forumPostsData &&
        props.forumPostsData.posts.map((post, index) => {
          return (
            <Post
              key={`post_${post.id}`}
              forumPost={post}
              enableButtons
              tags={props.forumPostsData?.tags[index]}
            />
          );
        })}
    </>
  );
}