import React, { useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "../Alert";
import {
  followUser,
  getUsers,
  searchUser,
  setMessage,
  setUsers,
} from "../../features/explore/exploreSlice";

function Explore() {
  const dispatch = useDispatch();
  const { loading, users, message } = useSelector((state) => state.explore);
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  function findUser(event) {
    return dispatch(searchUser(event.target.value));
  }
  function followHandler(id) {
    const data = { user: id };
    dispatch(followUser(data));
    dispatch(setUsers(id));
  }
  return (
    <>
      <div className="d-flex create-post">
        <input
          type="search"
          placeholder="search users"
          onChange={(e) => findUser(e)}
        />
        <button
          type="submit"
          className="btn-primary d-flex jc-center ai-center"
        >
          <BsSearch className="icon c-white" />
          <span className="d-none d-sm-block">Search</span>
        </button>
      </div>

      {loading ? (
        <span className="loader"></span>
      ) : users.length === 0 ? (
        "no users found"
      ) : (
        users.map((i, idx) => (
          <div className="user-list" key={idx}>
            <FaRegUserCircle />
            <p>{i.name}</p>
            <button
              onClick={() => followHandler(i._id)}
              className={`${i.following && "disable"}`}
            >
              {i.following ? "following" : "follow"}
            </button>
          </div>
        ))
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
export { Explore };
