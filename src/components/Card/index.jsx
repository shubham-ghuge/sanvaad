import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {
  commentOnPost,
  incrementCommentCount,
} from "../../features/feed/feedSlice";
import { FaHandsHelping, FaRegUserCircle } from "react-icons/fa";
import { BiCommentDots } from "react-icons/bi";
import { IoMdHeartEmpty } from "react-icons/io";
import { RiSendPlaneFill } from "react-icons/ri";

function Card({
  name,
  data: { text, _id, comments, likes, support },
  lock = false,
}) {
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
    <div className="user-post">
      <div className="header">
        <FaRegUserCircle />
        <p>{name}</p>
      </div>
      <p className="text" onClick={() => navigate(`/feed/${_id}`)}>
        {text}
      </p>
      <div className="actions d-flex">
        <button onClick={() => setShowComment((curr) => !curr)}>
          <BiCommentDots />
          <span className="c-white mr-2">{comments.length}</span>
          <span className="text">comments</span>
        </button>
        <button>
          <IoMdHeartEmpty />
          <span className="c-white mr-2">{likes.length}</span>
          <span className="text">likes</span>
        </button>
        <button>
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
            <span className="d-none d-sm-block">post</span>
          </button>
        </form>
      )}
    </div>
  );
}
export { Card };
