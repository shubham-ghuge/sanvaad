import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersPosts } from "../../features/Profile/profileSlice";

function UserPosts() {
  const { loading, userPosts } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsersPosts());
  }, []);
  return (
    <>
      {loading && "loading..."}
      <h1>Your Posts</h1>
      {userPosts &&
        userPosts.posts
          .map((j) => (
            <h3 key={j._id}>
              <span>{userPosts.name} </span>
              {j.text}
            </h3>
          ))
          .reverse()}
    </>
  );
}
export { UserPosts };
