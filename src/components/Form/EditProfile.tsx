import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { updateProfile } from "../../api/forumApi";
import { UserProfileContext } from "../../hooks/useUserProfile";
import DefaultButton from "./DefaultButton";
import DefaultFormCard from "./DefaultFormCard";
import DefaultTextField from "./DefaultTextField";

/**
 * EditProfile card is where the profile fields are edited.
 * @param props 
 * @returns 
 */
export default function EditProfile(props: {
  handleCancel: Function;
  handleSubmitSuccess: Function;
}) {
  const userProfileContextData = useContext(UserProfileContext);
  const [userProfile, setUserProfile] = useState<ForumProfile>();
  const { mutate: updateMutate } = useMutation(
    async (userProfile: ForumProfile) => updateProfile(userProfile),
    {
      onSuccess: () => {
        // adds the newly created tags and removed deleted tags into the database
        props.handleSubmitSuccess();
      },
    }
  );
  const [usernameError, setUsernameError] = useState<boolean>(false);
  useEffect(() => {
    if (userProfileContextData) {
      setUserProfile(userProfileContextData.userProfile);
    }
  }, [userProfileContextData]);
  const handleSubmit = () => {
    setUsernameError(userProfile?.username === "");
    if (userProfile && userProfile.username !== "") {
      updateMutate(userProfile);
    }
  };
  return (
    <>
      {userProfile && (
        <DefaultFormCard formHeader="Update Profile">
          <>
            <DefaultTextField
              type=""
              emptyError={usernameError}
              textFieldProps={{
                label: "Username",
                value: userProfile.username,
                onChange: (
                  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) =>
                  setUserProfile({ ...userProfile, username: e.target.value }),
              }}
            />
            <DefaultTextField
              type=""
              textFieldProps={{
                label: "Description",
                value: userProfile.description,
                multiline: true,
                onChange: (
                  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) =>
                  setUserProfile({
                    ...userProfile,
                    description: e.target.value,
                  }),
              }}
            />
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <DefaultButton onClick={handleSubmit} text="Update" />
              <DefaultButton
                onClick={props.handleCancel}
                text="Cancel"
                backgroundColor="secondary"
              />
            </Box>
          </>
        </DefaultFormCard>
      )}
    </>
  );
}
