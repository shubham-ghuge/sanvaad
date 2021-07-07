import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications } from "../../features/notification/notificationSlice";

function Notification() {
  const { loading, notifications } = useSelector((state) => state.notification);
  const dispatch = useDispatch();
  console.log(notifications);
  useEffect(() => {
    dispatch(getNotifications());
  }, []);
  return (
    <>
      {loading && "loading"}
      <h1>Notifications</h1>
      {notifications && notifications.map((i, idx) => <h4 key={idx}>{i}</h4>)}
    </>
  );
}
export { Notification };
