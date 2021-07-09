import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersPosts } from "../../features/Profile/profileSlice";
import { Card } from "../Card";

function UserPosts() {
  const { loading, userPosts } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsersPosts());
  }, []);
  return (
    <div className="flex-column feed">
      <h2 className="c-white text-center fsz-3">Your Posts</h2>
      {loading ? (
        <span className="loader"></span>
      ) : userPosts.posts.length === 0 ? (
        <h2 className="fsz-2">0 posts</h2>
      ) : (
        userPosts.posts
          .map((j) => (
            <Card name={userPosts.name} key={j._id} data={j} lock={true} />
          ))
          .reverse()
      )}
    </div>
  );
}
export { UserPosts };
