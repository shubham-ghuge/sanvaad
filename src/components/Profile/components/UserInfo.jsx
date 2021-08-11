import React from "react";
import { FaFeather, FaRegUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { HiOutlineUserGroup } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { logout } from "../../../features/auth/authSlice";

function UserInfo({ name, email, followersCount, posts }) {
  const dispatch = useDispatch();

  return (
    <>
      <div className="header jc-space-between">
        <div className="d-flex ai-center">
          <FaRegUserCircle className="icon fsz-5 c-white" />
          <p>{name}</p>
        </div>
        <button
          className="btn-primary d-flex ai-center"
          onClick={() => dispatch(logout())}
        >
          <FiLogOut className="icon c-white mr-2 fsz-1" />
          <span className="fw-600">Logout</span>
        </button>
      </div>
      <p>
        <span className="fw-600 mr-4">Email</span>
        <span>
          <input type="text" value={email} readOnly />
        </span>
      </p>
      <div className="stats">
        <div className="d-flex ai-center">
          <HiOutlineUserGroup className="icon" />
          <span className="ml-2">{followersCount} following</span>
        </div>
        <div className="d-flex ml-4 ai-center">
          <FaFeather className="icon" />
          <span className="ml-2">{posts} posts</span>
        </div>
      </div>
    </>
  );
}
export { UserInfo };
