import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createPost,
  loadPosts,
  setMessage,
} from "../../features/feed/feedSlice";
import { Card } from "../Card";
import { Alert } from "../Alert";

function Feed() {
  const dispatch = useDispatch();
  const [userInput, setUserInput] = useState({ text: "" });
  const { loading, posts, message } = useSelector((state) => state.feed);
  useEffect(() => {
    posts.length === 0 && dispatch(loadPosts());
  }, []);

  function postFormHandler(event) {
    event.preventDefault();
    dispatch(createPost(userInput));
    return setUserInput((curr) => ({ ...curr, text: "" }));
  }

  return (
    <>
      <h1>Your Feed</h1>
      {loading && <h2>loading...</h2>}
      <form onSubmit={(e) => postFormHandler(e)}>
        <input
          type="text"
          placeholder="what's happening"
          value={userInput.text}
          onChange={(e) =>
            setUserInput((curr) => ({ ...curr, text: e.target.value }))
          }
          required
        />
        <button type="submit">post</button>
      </form>
      {posts &&
        posts.map((i) =>
          i.posts
            .map((j) => <Card name={i.name} key={j._id} data={j} />)
            .reverse()
        )}
      {message && (
        <Alert
          message={message}
          color="primary"
          onClose={() => dispatch(setMessage(null))}
        />
      )}
    </>
  );
}
export { Feed };
