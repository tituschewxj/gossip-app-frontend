import jwtDecode from 'jwt-decode'
import { useEffect, useState } from 'react'
import {  getProfileByUserId } from '../api/forumApi'

export default function useUserProfile() {
    const [forumProfile, setForumProfile] = useState<ForumProfile>()
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