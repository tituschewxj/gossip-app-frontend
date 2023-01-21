import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  Avatar,
  Box,
  ButtonGroup,
  CardActions,
  CardHeader,
  Chip,
  Container,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import moment from "moment";

import DefaultIconButton from "../Form/DefaultIconButton";
import { UserProfileContext } from "../../hooks/useUserProfile";
import DefaultButton from "../Form/DefaultButton";

/**
 * Post component displays a post information in a card.
 * @param props 
 * @returns 
 */
export default function Post(props: {
  forumPost: ForumPost;
  disabledClickable?: boolean;
  enableButtons?: boolean;
  tags?: ForumTag[];
}) {
  const navigate = useNavigate();
  const userProfileContextData = useContext(UserProfileContext);

  return (
    <Container sx={{ marginTop: 1 }}>
      <Card>
        <CardHeader
          avatar={<Avatar></Avatar>}
          title={
            <Typography variant="h5" align={"left"}>
              <Link
                underline="none"
                href={`/posts/${props.forumPost.id}`}
                color="inherit"
              >
                {props.forumPost.title}
              </Link>
            </Typography>
          }
          subheader={
            <>
              <Grid container display="flex">
                <Grid item>
                  <Link
                    href={`/profile/${props.forumPost.author}`}
                    underline="none"
                    color="inherit"
                  >
                    <Typography variant="subtitle2" align={"left"}>
                      {props.forumPost.author && `By ${props.forumPost.author}`}
                    </Typography>
                  </Link>
                </Grid>
                <Grid item sx={{ flex: 1 }}>
                  <Typography variant="subtitle2" align={"right"}>
                    {props.forumPost.updated_at &&
                      `Updated at ${moment(props.forumPost.updated_at).format(
                        "D/M/YYYY"
                      )}`}
                  </Typography>
                </Grid>
              </Grid>
            </>
          }
        />
        <CardContent>
          <Typography component="span" variant="body1">
            <pre style={{ fontFamily: "inherit", whiteSpace: "pre-wrap" }}>
              {props.forumPost.content}
            </pre>
          </Typography>
        </CardContent>

        <CardActions sx={{ display: "flex", flexDirection: "row" }}>
          {userProfileContextData && 
          userProfileContextData.userProfile?.id === props.forumPost.profile_id && (
            <ButtonGroup>
              <DefaultIconButton
                tooltipTitle="Edit Post"
                onClick={() => navigate(`/posts/${props.forumPost.id}/edit`)}
                icon={<EditOutlinedIcon />}
              />
            </ButtonGroup>
          )}
          {props.tags?.map((tag: ForumTag) => {
            return (
              <Link
                key={`post_${props.forumPost.id}-tag_${tag.id}`}
                href={`/search?tags=${tag.name}`}
                underline="none"
                color="inherit"
              >
                <Chip label={tag.name} />
              </Link>
            );
          })}
          {props.enableButtons && (
            <Box sx={{ textAlign: "right", flex: 1 }}>
              <DefaultButton
                onClick={() => navigate(`/posts/${props.forumPost.id}`)}
                text={"View post"}
              ></DefaultButton>
            </Box>
          )}
        </CardActions>
      </Card>
    </Container>
  );
}
