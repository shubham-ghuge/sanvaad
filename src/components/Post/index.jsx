import React, { useEffect } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { TiArrowBackOutline } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import { getThePost } from "../../features/post/postSlice";
import { Card } from "../Card";

function Post() {
  let navigate = useNavigate();
  const { state } = useLocation();
  const { postId } = useParams();
  const { loading, text, likes, support, comments, author } = useSelector(
    (state) => state.post
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getThePost(postId));
  }, []);
  const postData = {
    text,
    comments,
    _id: postId,
    likes,
    support,
    author,
  };

  return (
    <>
      <div className="flex-column feed">
        <button
          className="btn-primary mt-2 ml-2"
          style={{ alignSelf: "flex-start" }}
          onClick={() => navigate(-1)}
        >
          <TiArrowBackOutline className="fsz-1" />
        </button>
        {loading ? (
          <span className="loader"></span>
        ) : (
          <>
            <Card data={postData} lock={true} name={state.from} />
            <p className="c-white ml-2 mt-4 fsz-1 fw-600">Comments</p>
            {comments.length === 0 ? (
              <h3 className="text-sm c-white m-7">0 comments</h3>
            ) : (
              comments.map((i) => (
                <div className="comment" key={i._id}>
                  <FaRegUserCircle />
                  <p>{i.text}</p>
                </div>
              ))
            )}
          </>
        )}
      </div>
    </>
  );
}
export { Post };
