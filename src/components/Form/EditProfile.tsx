import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { updateProfile } from '../../api/forumApi'
import useUserProfile from '../../hooks/useUserProfile'
import DefaultButton from './DefaultButton'
import DefaultFormCard from './DefaultFormCard'
import DefaultTextField from './DefaultTextField'

function EditProfile(props: { handleCancel: Function, handleSubmitSuccess: Function }) {
    const initUserProfile = useUserProfile()
    const [userProfile, setUserProfile] = useState<ForumProfile>()
    const { mutate: updateMutate } = useMutation(async (userProfile: ForumProfile) => updateProfile(userProfile), {
        onSuccess: (res) => {
            // adds the newly created tags and removed deleted tags into the database
            props.handleSubmitSuccess()
        }
    })
    useEffect(() => {
        console.log(initUserProfile)
        setUserProfile(initUserProfile)
    }, [initUserProfile])
    return (
        <>
            {userProfile && <DefaultFormCard formHeader='Update Profile'>
                <>
                    <DefaultTextField
                        textFieldProps={{
                            label: 'Username',
                            value: userProfile.username,
                            onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                                setUserProfile({ ...userProfile, username: e.target.value }),
                        }} />
                    <DefaultTextField
                        textFieldProps={{
                            label: 'Description',
                            value: userProfile.description,
                            multiline: true,
                            onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                                setUserProfile({ ...userProfile, description: e.target.value }),
                        }} />
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <DefaultButton onClick={() => updateMutate(userProfile)} text='Update' />
                        <DefaultButton onClick={props.handleCancel} text='Cancel' backgroundColor='secondary' />
                    </Box>
                </>
            </DefaultFormCard>}
        </>
    )
}

export default EditProfile