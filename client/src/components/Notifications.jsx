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

        setNotifications(
          res.data
        );
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <divhttps://cig-backend-xr8z.onrender.com
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

      {notifications.length ===
      0 ? (
        <p>
          No notifications
        </p>
      ) : (
        notifications.map(
          (notification) => (
            <div
              key={
                notification._id
              }
              style={{
                padding:
                  "10px",
                borderBottom:
                  "1px solid #eee",
              }}
            >
              {
                notification.message
              }
            </div>
          )
        )
      )}
    </divhttps:>
  );
}

export default Notifications;