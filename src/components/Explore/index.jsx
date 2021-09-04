import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "../Alert";
import {
  followUser,
  getUsers,
  setMessage,
  setUsers,
} from "../../features/explore/exploreSlice";

function Explore() {
  const dispatch = useDispatch();
  const { loading, users, message } = useSelector((state) => state.explore);
  const [filteredData, setFilteredData] = useState([]);
  const { userName } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUsers());
  }, []);
  useEffect(() => {
    setFilteredData(users);
  }, [users]);
  function findUser(text) {
    const data = users.filter((i) =>
      i.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(data);
  }
  function followHandler(id) {
    const data = { user: id };
    dispatch(followUser(data));
    dispatch(setUsers(id));
  }
  return (
    <div className="feed">
      <div className="d-flex create-post">
        <input
          type="search"
          placeholder="search users"
          onChange={(e) => findUser(e.target.value)}
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
      ) : filteredData.length === 0 ? (
        <h2 className="c-white text-center mt-4 fsz-3">No Users Found</h2>
      ) : (
        filteredData.map(
          (i, idx) =>
            i.name !== userName && (
              <div className="user-list" key={idx}>
                <div className="d-flex ai-center">
                  <FaRegUserCircle />
                  <p className="ml-2">{i.name}</p>
                </div>
                <button onClick={() => followHandler(i._id)}>
                  {i.following ? "following" : "follow"}
                </button>
              </div>
            )
        )
      )}
      {message && (
        <Alert
          message={message}
          color="primary"
          onClose={() => dispatch(setMessage(null))}
        />
      )}
    </div>
  );
}
export { Explore };
