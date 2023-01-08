import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Box, ButtonGroup, Card, CardActions, CardContent, Container, Grid, Link, Typography } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'

import moment from 'moment'

import useUserProfile from '../hooks/useUserProfile'
import DefaultIconButton from './DefaultIconButton'
import DefaultButton from './Form/DefaultButton'

function Comment(props: { forumComment: ForumComment, enableButtons?: boolean }) {
  const navigate = useNavigate()
  const userProfile = useUserProfile()
  
  return (
    <>
      <Container sx={{ marginTop: 1 }}>
      <Card>
        <CardHeader
          avatar={
            <Avatar></Avatar>
          }
          subheader={
            <>
              <Grid container display="flex">
                <Grid item>
                  <Link href={`/profile/${props.forumComment.author}`} underline='none' color='inherit'>
                    <Typography
                      variant="subtitle2"
                      align={'left'}>
                      {props.forumComment.author && `By ${props.forumComment.author}`}
                    </Typography>
                  </Link>
                </Grid>
                <Grid item sx={{ flex: 1 }}>
                  <Typography
                    variant="subtitle2"
                    align={'right'}>
                    {props.forumComment.updated_at && `Updated at ${moment(props.forumComment.updated_at).format('D/M/YYYY')}`}
                  </Typography>
                </Grid>
              </Grid>
            </>
          }
        />
        <CardContent>
          <Typography component="span" variant="body1" >
            <pre style={{ fontFamily: 'inherit', whiteSpace: 'pre-wrap' }}>
              {props.forumComment.content}
            </pre>
          </Typography>
        </CardContent>

        <CardActions sx={{ display: 'flex', flexDirection: 'row' }}>
          {userProfile && userProfile.id === props.forumComment.profile_id && <ButtonGroup>
            <DefaultIconButton tooltipTitle='Edit Comment'
              onClick={() => navigate(`/comments/${props.forumComment.id}/edit`)}
              icon={<EditOutlinedIcon />} />
          </ButtonGroup>}

          {props.enableButtons && <Box sx={{ textAlign: 'right', flex: 1 }}>
            <DefaultButton onClick={() => navigate(`/posts/${props.forumComment.post_id}`)} text={'View comment in post'}></DefaultButton>
          </Box>}
        </CardActions>
      </Card>
    </Container >

    </>
  )
}

export default Comment