import jwtDecode from 'jwt-decode'
import { useEffect, useState } from 'react'
import {  getProfileByUserId } from '../api/forumApi'
import { initForumProfile } from '../types/typeDefaults'

export default function useUserProfile() {
    // gets the current user's profile using the jwt token
    const [forumProfile, setForumProfile] = useState<ForumProfile>(initForumProfile())
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            const decoded = jwtDecode<JWTToken>(token)
            // console.log(decoded.sub)
            getProfileByUserId(parseInt(decoded.sub))
                .then((res: ForumProfile) => {
                    // console.log(res)
                    setForumProfile(res)
                })
                .catch(err => console.log(err))
        }
    }, [localStorage.getItem('token')])
    
    return forumProfile
}