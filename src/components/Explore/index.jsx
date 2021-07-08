import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../features/explore/exploreSlice";

function Explore() {
  const dispatch = useDispatch();
  const { loading, users } = useSelector((state) => state.explore);
  console.log(users);
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  return (
    <>
      <form>
        <input type="search" placeholder="search" />
      </form>
      {users &&
        users.map((i, idx) => (
          <div key={idx}>
            {i.name} <button onClick={() => console.log(i._id)}>follow</button>
          </div>
        ))}
      {loading && "loading..."}
    </>
  );
}
export { Explore };
