import React, { useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, searchUser } from "../../features/explore/exploreSlice";

function Explore() {
  const dispatch = useDispatch();
  const { loading, users } = useSelector((state) => state.explore);
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  function findUser(event) {
    return dispatch(searchUser(event.target.value));
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
            <button onClick={() => console.log(i._id)}>
              {i.following ? "following" : "follow"}
            </button>
          </div>
        ))
      )}
    </>
  );
}
export { Explore };
