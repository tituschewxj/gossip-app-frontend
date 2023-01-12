import React from "react";

import Post from "./Post";

function PostsList(props: { forumPostsData: ForumPostsData }) {
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

export default PostsList;
