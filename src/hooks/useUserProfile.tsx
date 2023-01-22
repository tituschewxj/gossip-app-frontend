import jwtDecode from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getProfileByUserId } from "../api/forumApi";
import { initForumProfile } from "../types/typeDefaults";


export interface UserProfileContextData {
  userProfile: ForumProfile | undefined;
  setUserProfile: Function;
}

export const UserProfileContext = createContext<UserProfileContextData | undefined>(undefined);

/**
 * useUserProfile manages the current user's profile information.
 * @returns 
 */
export default function useUserProfile(): UserProfileContextData {
  const [forumProfile, setForumProfile] = useState<ForumProfile | undefined>(initForumProfile());

  const { refetch } = useQuery("get_profile_by_user_id", () => {
    // gets the current user's profile using the jwt token
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode<JWTToken>(token);
      return getProfileByUserId(parseInt(decoded.sub));
    } else {
      // console.log('reject')
      return Promise.resolve(undefined);
    }
  }, {
    onSuccess: (res: ForumProfile) => {
      setForumProfile(res);
      // console.log("updated")
    },
    enabled: false,
  });

  useEffect(() => {
    refetch();
    // console.log(forumProfile);
  }, [forumProfile, refetch])



  return {
    userProfile: forumProfile,
    setUserProfile: () => refetch(),
  };
}
