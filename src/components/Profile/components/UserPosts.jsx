import React from "react";
import { useSelector } from "react-redux";
import { Card } from "../../Card";

function UserPosts({ data }) {
  const { loading } = useSelector((state) => state.profile);
  return (
    <div className="flex-column">
      <h2 className="c-white text-center mt-4">Your Posts</h2>
      {loading ? (
        <span className="loader"></span>
      ) : data.posts.length === 0 ? (
        <h2 className="fsz-2 text-center c-white mt-7">
          0 posts, please share your thoughts!
        </h2>
      ) : (
        data.posts
          .map((j) => (
            <Card name={data.name} userPosts={true} key={j._id} data={j} />
          ))
          .reverse()
      )}
      <div className="margin"></div>
    </div>
    
  );
}
export { UserPosts };
