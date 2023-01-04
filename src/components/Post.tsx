import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { Avatar, ButtonGroup, CardActions, CardHeader, Chip, Container, Grid, IconButton, Tooltip, Typography } from '@mui/material'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined'
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
// import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
// import BookmarkAddedOutlinedIcon from '@mui/icons-material/BookmarkAddedOutlined';
// import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'

import moment from 'moment'

import DefaultIconButton from './DefaultIconButton'
import { useQuery } from 'react-query'
import { getTagsByPostId } from '../api/forumApi'

function Post(props: { forumPost: ForumPost }) {
  const navigate = useNavigate()
  const [postTags, setPostTags] = useState<ForumTag[]>()
  useQuery(`get_tag_for_post_${props.forumPost.id}`, () => getTagsByPostId(parseInt(`${props.forumPost.id}`)), {
    onSuccess: (res) => {
      setPostTags(res)
    }
  })
  return (
    <Container sx={{ marginTop: 1 }}>
      <Card>
        <CardHeader
          avatar={
            <Avatar></Avatar>
          }
          title={
            <Typography variant='h5' align={'left'}>
              {props.forumPost.title}
            </Typography>
          }

          subheader={
            <>
              <Grid container display="flex">
                <Grid item>
                  <Typography
                    variant="subtitle2"
                    align={'left'}>
                    {props.forumPost.author && `By ${props.forumPost.author}`}
                  </Typography>
                </Grid>
                <Grid item sx={{ flex: 1 }}>
                  <Typography
                    variant="subtitle2"
                    align={'right'}>
                    {props.forumPost.updated_at && `Updated at ${moment(props.forumPost.updated_at).format('L')}`}
                  </Typography>
                </Grid>
              </Grid>
            </>
          }
        />
        <CardContent>
          <Typography component="span" variant="body1" >
            <pre style={{ fontFamily: 'inherit', whiteSpace: 'pre-wrap' }}>
              {props.forumPost.content}
            </pre>
          </Typography>
        </CardContent>

        <CardActions>
          <ButtonGroup>
            {/* <Tooltip title="Like">
              <IconButton><ThumbUpOutlinedIcon /></IconButton>
            </Tooltip>
            <Tooltip title="Dislike">
              <IconButton><ThumbDownOutlinedIcon /></IconButton>
            </Tooltip>
            <Tooltip title="Add Comment">
              <IconButton onClick={() => { console.log("add comment") }}>
                <AddCommentOutlinedIcon />
              </IconButton>
            </Tooltip> */}
            <DefaultIconButton tooltipTitle='Edit Post'
              onClick={() => navigate(`/posts/${props.forumPost.id}/edit`)}
              icon={<EditOutlinedIcon />} />
            <DefaultIconButton tooltipTitle='View Post'
              onClick={() => navigate(`/posts/${props.forumPost.id}`)}
              icon={<RemoveRedEyeOutlinedIcon />} />
          </ButtonGroup>
          {postTags?.map((tag: ForumTag) => {
            return (<Chip key={tag.id} label={tag.name} />)
          })}
          {/* <Chip label="random tag" />
          <Chip label="random tag2" />
          <Chip label="random tag3" /> */}
        </CardActions>
      </Card>
    </Container>
  );
}

export default Post;