// import logo from './logo.svg';
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar/Navbar";

import HomePage from "./pages/HomePage";
import AuthenticationPage from "./pages/AuthenticationPage";
import EditPage from "./pages/EditPage";
import ThreadPage from "./pages/ThreadPage";
import ProfilePage from "./pages/ProfilePage";
import ResultsPage from "./pages/ResultsPage";
import NotFound from "./pages/NotFound";

import PrivateRoute from "./components/Routes/PrivateRoute";
import DefaultDialog from "./components/Notifications/DefaultDialog";
import { useErrorState } from "./hooks/useErrorState";
import useUserProfile, { UserProfileContext } from "./hooks/useUserProfile";

/**
 * App is the base component.
 * @returns 
 */
export default function App() {
  const { hasError, setHasError } = useErrorState();
  const userProfile = useUserProfile();
  useEffect(() => {
    // updateUserProfile();
    console.log(userProfile);
  }, [userProfile.userProfile])

  return (
    <UserProfileContext.Provider value={userProfile}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/page/:page" element={<HomePage />} />
        <Route
          path="/login"
          element={<AuthenticationPage authenticationOperation="login" />}
        />
        <Route
          path="/register"
          element={<AuthenticationPage authenticationOperation="register" />}
        />

        <Route path="/posts/:post_id" element={<ThreadPage />} />
        <Route
          path="/new_post"
          element={
            <PrivateRoute>
              <EditPage editType="new_post" />
            </PrivateRoute>
          }
        />
        <Route
          path="/posts/:post_id/edit"
          element={
            <PrivateRoute>
              <EditPage editType="edit_post" />
            </PrivateRoute>
          }
        />
        <Route
          path="/comments/:comment_id/edit"
          element={
            <PrivateRoute>
              <EditPage editType="edit_comment" />
            </PrivateRoute>
          }
        />

        <Route
          path="/edit_profile"
          element={
            <PrivateRoute>
              <EditPage editType="edit_profile" />
            </PrivateRoute>
          }
        />
        <Route path="/profile/:username" element={<ProfilePage />} />
        <Route
          path="/profile/:username/posts"
          element={<ProfilePage activeTab={0} />}
        />
        <Route
          path="/profile/:username/comments"
          element={<ProfilePage activeTab={1} />}
        />
        {/* <Route
          path="/profile/:username/bookmarks"
          element={<ProfilePage activeTab={2} />}
        /> */}

        <Route path="/search" element={<ResultsPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      {hasError && (
        <DefaultDialog
          open={hasError}
          dialogBehaviour={{
            type: "error",
            handleClose: () => setHasError(false),
          }}
        />
      )}
    </UserProfileContext.Provider>
  );
}