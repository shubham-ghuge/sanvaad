import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications } from "../../features/notification/notificationSlice";

function Notification() {
  const { loading, notifications } = useSelector((state) => state.notification);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNotifications());
  }, []);

  return (
    <div className="feed">
      {loading && <span className="loader"></span>}
      {notifications && notifications.length === 0 ? (
        <h2 className="c-white text-center fsz-2">0 notifications</h2>
      ) : (
        notifications
          .map((i, idx) => (
            <div className="notification p-2 mx-auto" key={idx}>
              <span className="fw-600 mr-2">{i.name}</span>
              {i.text}
            </div>
          ))
          .reverse()
      )}
    </div>
  );
}
export { Notification };
