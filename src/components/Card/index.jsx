import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Actions } from "./components/Actions";

function Card({
  name,
  data: { text, _id, comments, likes, support },
  lock = false,
  userPosts = false,
}) {
  return (
    <div className="user-post">
      <div className="header">
        <FaRegUserCircle />
        <p>{name}</p>
      </div>
      <Link to={`/feed/${_id}`} state={{ from: name }} className="text">
        {text}
      </Link>
      <Actions
        lock={lock}
        _id={_id}
        userPosts={userPosts}
        stats={{
          totalComments: comments.length,
          totalLikes: likes.length,
          totalSupport: support.length,
        }}
      />
    </div>
  );
}
export { Card };
