import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost, loadPosts } from "../../features/feed/feedSlice";

function Feed() {
  const dispatch = useDispatch();
  const [userInput, setUserInput] = useState({ text: "" });
  const { loading, posts } = useSelector((state) => state.feed);
  useEffect(() => {
    dispatch(loadPosts());
  }, []);
  function postFormHandler(event) {
    event.preventDefault();
    dispatch(createPost(userInput));
  }

  return (
    <>
      <h1>Your Feed</h1>
      {loading && <h2>loading...</h2>}
      <form onSubmit={(e) => postFormHandler(e)}>
        <input
          type="text"
          placeholder="what's happening"
          onChange={(e) =>
            setUserInput((curr) => ({ ...curr, text: e.target.value }))
          }
        />
        <button type="submit">post</button>
      </form>
      {posts &&
        posts.map((i) =>
          i.posts.map((j) => (
            <h3 key={j._id}>
              <span>{i.name} </span>
              {j.text}
            </h3>
          ))
        )}
    </>
  );
}
export { Feed };
