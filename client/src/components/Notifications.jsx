import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

function Notifications() {
  const [
    notifications,
    setNotifications,
  ] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await axios.get(
            "/api/notifications",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        console.log("Notifications API:", res.data);

if (Array.isArray(res.data)) {
  setNotifications(res.data);
} else if (
  Array.isArray(res.data.notifications)
) {
  setNotifications(
    res.data.notifications
  );
} else {
  setNotifications([]);
}
      } catch (error) {
        console.error(error);
      }
    };

  return (
  <div
    style={{
      marginTop: "30px",
      background: "white",
      padding: "20px",
      borderRadius: "15px",
    }}
  >
    <h2
      style={{
        color: "#1e40af",
      }}
    >
      🔔 Notifications
    </h2>

    {notifications.length === 0 ? (
      <p>No notifications</p>
    ) : (
      Array.isArray(notifications) &&
notifications.map(
  (notification) => (
          <div
            key={notification._id}
            style={{
              padding: "10px",
              borderBottom:
                "1px solid #eee",
            }}
          >
            {notification.message}
          </div>
        )
      )
    )}
  </div>
);
}

export default Notifications;