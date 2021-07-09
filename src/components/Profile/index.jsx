import React, { useEffect } from "react";
import { FaFeather, FaRegUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getProfileData } from "../../features/Profile/profileSlice";
import { HiOutlineUserGroup } from "react-icons/hi";
import { logout } from "../../features/auth/authSlice";

function Profile() {
  const dispatch = useDispatch();
  const { loading, profileData } = useSelector((state) => state.profile);

  useEffect(() => {
    profileData.name === "" && dispatch(getProfileData());
  }, []);

  return (
    <div className="flex-column feed">
      <h2 className="c-white text-center fsz-3">Profile</h2>
      {loading ? (
        <span className="loader"></span>
      ) : (
        <div className="user-info">
          {profileData && (
            <>
              <div className="header jc-space-between">
                <div className="d-flex ai-center">
                  <FaRegUserCircle className="icon fsz-5 c-white" />
                  <p>{profileData.name}</p>
                </div>
                <button className="btn-primary d-flex ai-center" onClick={()=>dispatch(logout())}>
                  <FiLogOut className="icon c-white mr-2 fsz-1" />
                  <span className="fw-600">Logout</span>
                </button>
              </div>
              <p>
                <span className="fw-600 mr-4">Email</span>
                <span>
                  <input type="text" value={profileData.email} readOnly />
                </span>
              </p>
              <div className="stats">
                <div className="d-flex ai-center">
                  <HiOutlineUserGroup className="icon" />
                  <span className="ml-2">
                    {profileData.followers.length} following
                  </span>
                </div>
                <div className="d-flex ml-4 ai-center">
                  <FaFeather className="icon" />
                  <span className="ml-2">{profileData.posts} posts</span>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
export { Profile };
