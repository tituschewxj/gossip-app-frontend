import { Avatar, Container, Paper, Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getProfileByUsername } from "../api/forumApi";
import ProfileComments from "../components/Profile/ProfileComments";
import ProfilePosts from "../components/Profile/ProfilePosts";

function ProfilePage(props: { activeTab?: number }) {
  // Page for viewing the profile of a user, contains the user's posts, comments, and bookmarks
  const { username } = useParams();
  const { data: forumProfile, isLoading } = useQuery(
    "get_profile",
    () => getProfileByUsername(`${username}`),
    {
      onError: () => {
        setHasError(true);
      },
    }
  );
  const [hasError, setHasError] = useState<boolean>(false);
  const [tabState, setTabState] = useState(
    props.activeTab ? props.activeTab : 0
  );
  const navigate = useNavigate();

  useEffect(() => {
    switch (tabState) {
      case 0:
        navigate(`/profile/${username}/posts`);
        break;
      case 1:
        navigate(`/profile/${username}/comments`);
        break;
      case 2:
        navigate(`/profile/${username}/bookmarks`);
        break;
      default:
        break;
    }
  }, [tabState, username, navigate]);

  return (
    <>
      {!isLoading && !hasError && (
        <Container>
          <Paper>
            <Box sx={{ margin: 1, display: "flex", alignItems: "center" }}>
              <Avatar sx={{ margin: 1, width: 64, height: 64 }}></Avatar>
              <Typography variant="h3" sx={{ margin: 1 }}>
                {forumProfile?.username}
              </Typography>
            </Box>
            {forumProfile && (
              <Typography variant="body1" sx={{ margin: 1 }}>
                {forumProfile.description
                  ? forumProfile.description
                  : "No description"}
              </Typography>
            )}
            <Tabs
              value={tabState}
              onChange={(e, val) => setTabState(val)}
              aria-label="basic tabs example"
            >
              <Tab label="Posts" />
              <Tab label="Comments" />
              <Tab label="Bookmarked" />
            </Tabs>
            <Box>
              <TabPanel value={tabState} index={0}>
                <ProfilePosts />
              </TabPanel>
              <TabPanel value={tabState} index={1}>
                <ProfileComments />
              </TabPanel>
              <TabPanel value={tabState} index={2}>
                Bookmarks
              </TabPanel>
            </Box>
          </Paper>
        </Container>
      )}
      {hasError && <p>Not found</p>}
    </>
  );
}

// Referenced from https://mui.com/material-ui/react-tabs/
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default ProfilePage;
