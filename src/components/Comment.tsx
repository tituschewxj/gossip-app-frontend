import { Button, Card, CardContent, Container, Typography } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Comment(props: { commentDetails: ForumComment }) {
  const navigate = useNavigate()
  return (
    <>
      <Container sx={{ marginTop: 1}}>
        <Card>
          <CardHeader subheader={
            `By ${props.commentDetails.author}`
          } avatar={
            <Avatar></Avatar>
          }>
          </CardHeader>
          <CardContent>
            <Typography>
              {props.commentDetails.content}
            </Typography>
          </CardContent>
          <Button onClick={() => navigate(`/comments/${props.commentDetails.id}/edit`)}>
            Edit
          </Button>
        </Card>
      </Container>
      {/* <p>{props.commentDetails.id}</p>
      <p>{props.commentDetails.post_id}</p> */}

    </>
  )
}

export default Comment