import React, { useEffect } from "react";
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
      <input
        type="search"
        placeholder="search users"
        onChange={(e) => findUser(e)}
      />

      {loading
        ? "loading..."
        : users.length === 0
        ? "no users found"
        : users.map((i, idx) => (
            <div key={idx}>
              {i.name}{" "}
              <button onClick={() => console.log(i._id)}>follow</button>
            </div>
          ))}
    </>
  );
}
export { Explore };
