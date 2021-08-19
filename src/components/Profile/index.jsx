import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfileData,
  getUsersPosts,
} from "../../features/Profile/profileSlice";
import { UserPosts } from "./components/UserPosts";
import { UserInfo } from "./components/UserInfo";

function Profile() {
  const dispatch = useDispatch();

  const { profileData, userPosts } = useSelector((state) => state.profile);

  useEffect(() => {
    profileData.name === "" && dispatch(getProfileData());
    dispatch(getUsersPosts());
  }, []);

  return (
    <>
      <div className="flex-column">
        <div className="user-info mt-2 mx-auto">
          {profileData && (
            <UserInfo
              email={profileData.email}
              followersCount={profileData.followers.length}
              name={profileData.name}
              posts={profileData.posts}
            />
          )}
        </div>
      </div>
      <UserPosts data={userPosts} />
    </>
  );
}
export { Profile };
