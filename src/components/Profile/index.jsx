import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileData } from "../../features/Profile/profileSlice";

function Profile() {
  const dispatch = useDispatch();
  const { loading, profileData } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getProfileData());
  }, []);

  return (
    <>
      {loading && "loading..."}
      <h1>Your Profile</h1>
      {profileData && (
        <>
          <h3>name {profileData.name}</h3>
          <h3>Email {profileData.email}</h3>
          <h3>posts {profileData.posts}</h3>
          <h3>followers {profileData.followers}</h3>
        </>
      )}
    </>
  );
}
export { Profile };
