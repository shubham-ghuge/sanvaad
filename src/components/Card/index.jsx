import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {
  commentOnPost,
  incrementCommentCount,
} from "../../features/feed/feedSlice";

function Card({ name, data: { text, _id, comments, likes, support } }) {
  let navigate = useNavigate();
  const [showComment, setShowComment] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const dispatch = useDispatch();
  function commentHandler(event) {
    event.preventDefault();
    dispatch(commentOnPost({ postId: _id, text: commentInput }));
    dispatch(incrementCommentCount({ postId: _id }));
    setCommentInput(" ");
    setShowComment(false);
  }
  return (
    <div
      className="flex-column w-30 my-4"
      onClick={() => navigate(`/posts/${_id}`)}
    >
      <h3>
        <span>{name} </span>
        {text}
      </h3>
      <div className="d-flex mt-2 jc-space-between">
        <button className="btn-primary" onClick={() => setShowComment(true)}>
          comments {comments.length}
        </button>
        <p>likes {likes.length}</p>
        <p>support {support.length}</p>
      </div>
      {showComment && (
        <div className="mt-3">
          <form onSubmit={(e) => commentHandler(e)}>
            <input
              type="text"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              required
            />
            <button className="btn-primary" type="submit">
              post
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
export { Card };
