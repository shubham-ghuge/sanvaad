import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  commentOnPost,
  incrementStatCount,
  likePost,
  setMessage,
} from "../../../features/feed/feedSlice";

import {
  addCommentOnPost,
  incrementCountOnUserPost,
} from "../../../features/Profile/profileSlice";

import { Alert } from "../../Alert";
import { FaHandsHelping } from "react-icons/fa";
import { BiCommentDots } from "react-icons/bi";
import { IoMdHeartHalf } from "react-icons/io";
import { RiSendPlaneFill } from "react-icons/ri";
import { addComment, incrementStats } from "../../../features/post/postSlice";

function Actions({ lock, stats, _id, userPosts, author }) {
  const dispatch = useDispatch();
  const [commentInput, setCommentInput] = useState("");
  const [showComment, setShowComment] = useState(false);
  const { message } = useSelector((state) => state.feed);
  function commentHandler(event) {
    event.preventDefault();
    dispatch(commentOnPost({ postId: _id, text: commentInput, author }));
    dispatch(incrementStatCount({ postId: _id, data: "comments" }));
    if (lock) {
      dispatch(addComment(commentInput));
    }
    if (userPosts) {
      dispatch(addCommentOnPost({ _id, text: commentInput }));
    }
    setCommentInput(" ");
    setShowComment(false);
  }
  function actionHandler(userAction) {
    const authorId = { author };
    dispatch(likePost({ postId: _id, routeToTake: userAction, authorId }));
    dispatch(incrementStatCount({ postId: _id, data: userAction }));
    if (lock) {
      dispatch(incrementStats(userAction));
    }
    if (userPosts) {
      dispatch(incrementCountOnUserPost({ _id, objKey: userAction }));
    }
  }
  return (
    <>
      <div className={`actions d-flex`}>
        <button onClick={() => setShowComment((curr) => !curr)}>
          <BiCommentDots />
          <span className="c-white mr-2">{stats.totalComments}</span>
          <span className="text">comments</span>
        </button>
        <button onClick={() => actionHandler("likes")}>
          <IoMdHeartHalf />
          <span className="c-white mr-2">{stats.totalLikes}</span>
          <span className="text">likes</span>
        </button>
        <button onClick={() => actionHandler("support")}>
          <FaHandsHelping />
          <span className="c-white mr-2">{stats.totalSupport}</span>
          <span className="text">support</span>
        </button>
      </div>

      {showComment && (
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
      {message && (
        <Alert
          message={message}
          color="success"
          onClose={() => dispatch(setMessage("message"))}
        />
      )}
    </>
  );
}
export { Actions };
