import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getThePost } from "../../features/post/postSlice";

function Post() {
  const { postId } = useParams();
  const { loading, text, likes, support, comments } = useSelector(
    (state) => state.post
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getThePost(postId));
  }, []);
  return (
    <>
      <h1>Post</h1>
      {loading ? (
        "loading..."
      ) : (
        <div className="flex-column">
          <p>text:{text}</p>
          <p>likes{likes}</p>
          <p>support {support}</p>
          <p>comments:{comments.length}</p>
          {comments.map((i) => (
            <div key={i._id}>{i.text}</div>
          ))}
        </div>
      )}
    </>
  );
}
export { Post };
