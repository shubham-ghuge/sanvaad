import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  commentOnPost,
  incrementStatCount,
  likePost,
} from "../../features/feed/feedSlice";
import { FaHandsHelping, FaRegUserCircle } from "react-icons/fa";
import { BiCommentDots } from "react-icons/bi";
import { IoMdHeartHalf } from "react-icons/io";
import { RiSendPlaneFill } from "react-icons/ri";
import { Link } from "react-router-dom";

function Card({
  name,
  data: { text, _id, comments, likes, support },
  lock = false,
}) {
  const [showComment, setShowComment] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const dispatch = useDispatch();
  function commentHandler(event) {
    event.preventDefault();
    dispatch(commentOnPost({ postId: _id, text: commentInput }));
    dispatch(incrementStatCount({ postId: _id, data: "comments" }));
    setCommentInput(" ");
    setShowComment(false);
  }
  function likeHandler() {
    dispatch(likePost({ postId: _id, routeToTake: "likes" }));
    dispatch(incrementStatCount({ postId: _id, data: "likes" }));
  }
  function supportHandler() {
    dispatch(likePost({ postId: _id, routeToTake: "support" }));
    dispatch(incrementStatCount({ postId: _id, data: "support" }));
  }
  return (
    <div className="user-post">
      <div className="header">
        <FaRegUserCircle />
        <p>{name}</p>
      </div>
      <Link to={`/feed/${_id}`} state={{ from: name }} className="text">
        {text}
      </Link>
      <div className={`actions d-flex ${lock && "disable"}`}>
        <button onClick={() => setShowComment((curr) => !curr)}>
          <BiCommentDots />
          <span className="c-white mr-2">{comments.length}</span>
          <span className="text">comments</span>
        </button>
        <button onClick={likeHandler}>
          <IoMdHeartHalf />
          <span className="c-white mr-2">{likes.length}</span>
          <span className="text">likes</span>
        </button>
        <button onClick={supportHandler}>
          <FaHandsHelping />
          <span className="c-white mr-2">{support.length}</span>
          <span className="text">support</span>
        </button>
      </div>
      {showComment && !lock && (
        <form
          className="d-flex create-post"
          onSubmit={(e) => commentHandler(e)}
        >
          <input
            type="text"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            required
          />
          <button
            type="submit"
            className="btn-primary d-flex jc-center ai-center"
          >
            <RiSendPlaneFill className="icon c-white" />
            <span className="d-none d-sm-block">send</span>
          </button>
        </form>
      )}
    </div>
  );
}
export { Card };
