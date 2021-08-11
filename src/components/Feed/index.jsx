import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost, loadPosts, setMessage } from "../../features/feed/feedSlice";
import { Card } from "../Card";
import { RiSendPlaneFill } from "react-icons/ri";

function Feed() {
  const dispatch = useDispatch();
  const [userInput, setUserInput] = useState({ text: "" });
  const { loading, posts, postLoading, message } = useSelector(
    (state) => state.feed
  );

  useEffect(() => {
    dispatch(loadPosts());
  }, []);

  function postFormHandler(event) {
    event.preventDefault();
    dispatch(createPost(userInput));
    return setUserInput((curr) => ({ ...curr, text: "" }));
  }

  return (
    <div className="flex-column feed">
      <form className="d-flex create-post" onSubmit={(e) => postFormHandler(e)}>
        <input
          type="text"
          placeholder="what's happening"
          value={userInput.text}
          onChange={(e) =>
            setUserInput((curr) => ({ ...curr, text: e.target.value }))
          }
          required
        />
        <button
          type="submit"
          className="btn-primary d-flex jc-center ai-center"
        >
          {postLoading ? (
            <span className="sm-loader"></span>
          ) : (
            <>
              <RiSendPlaneFill className="icon c-white" />
              <span className="d-none d-sm-block">post</span>
            </>
          )}
        </button>
      </form>
      {loading && <span className="loader"></span>}
      {posts.length === 0 ? (
        <h3 className="fsz-2 c-white m-5 text-center">
          No Feed Available, explore users!
        </h3>
      ) : (
        posts.map((i) =>
          i.posts
            .map((j) => <Card name={i.name} key={j._id} data={j} />)
            .reverse()
        )
      )}
      {message && (
        <Alert
          message={message}
          color="success"
          onClose={() => dispatch(setMessage(null))}
        />
      )}
    </div>
  );
}
export { Feed };
