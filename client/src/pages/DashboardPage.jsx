import DashboardLayout from "../layouts/DashboardLayout";
import { useEffect, useState } from "react";
import { getEvents } from "../services/eventService";
import { getAllMedia } from "../services/mediaService";
import Notifications from "../components/Notifications";
import { uploadSelfie } from "../services/selfieService";

function DashboardPage() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [eventCount, setEventCount] =
    useState(0);

  const [mediaCount, setMediaCount] =
    useState(0);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const events =
        await getEvents();

      const media =
        await getAllMedia();

      setEventCount(
        events.length
      );

      setMediaCount(
        media.length
      );
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <DashboardLayout>
      <h1
  style={{
    color: "#1e40af",
    fontSize: "2.5rem",
    marginBottom: "10px",
  }}
>
  Welcome, {user?.name}
</h1>

      <p>
        Role: {user?.role}
      </p>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "30px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            width: "220px",
            padding: "20px",
            background: "white",
            borderRadius: "15px",
            boxShadow:
              "0 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h3
  style={{
    color: "#1e40af",
  }}
>
  📅 Events
</h3>

          <h1>
            {eventCount}
          </h1>
        </div>

        <div
          style={{
            width: "220px",
            padding: "20px",
            background: "white",
            borderRadius: "15px",
            boxShadow:
              "0 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h3
  style={{
    color: "#1e40af",
  }}
>
  🖼 Media
</h3>

          <h1>
            {mediaCount}
          </h1>
        </div>

        <div
          style={{
            width: "220px",
            padding: "20px",
            background: "white",
            borderRadius: "15px",
            boxShadow:
              "0 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h3
  style={{
    color: "#1e40af",
  }}
>
  👤 Role
</h3>

          <h2>
            {user?.role}
          </h2>
        </div>
      </div>
<Notifications />
<div
  style={{
    marginTop: "30px",
    display: "flex",
    gap: "20px",
    alignItems: "center",
    flexWrap: "wrap",
  }}
>
  <div
    style={{
      background: "white",
      padding: "20px",
      borderRadius: "15px",
      boxShadow:
        "0 4px 10px rgba(0,0,0,0.1)",
    }}
  >
    <h3
  style={{
    color: "#1e40af",
  }}
>
  📸 Upload Reference Selfie
</h3>

    <input
      type="file"
      accept="image/*"
      onChange={async (e) => {
        try {
          const file =
            e.target.files[0];

          if (!file) return;

          await uploadSelfie(
            file
          );

          alert(
            "Selfie uploaded successfully"
          );
        } catch (error) {
          console.error(error);

          alert(
            "Upload failed"
          );
        }
      }}
    />
  </div>

  <div
    style={{
      background: "white",
      padding: "20px",
      borderRadius: "15px",
      boxShadow:
        "0 4px 10px rgba(0,0,0,0.1)",
    }}
  >
    <h3
  style={{
    color: "#1e40af",
  }}
>
  🔍 Facial Recognition
</h3>

    <a href="/my-photos">
      <button>
        Find My Photos
      </button>
    </a>
  </div>
</div>
      <div
        style={{
          marginTop: "40px",
          background: "white",
          padding: "20px",
          borderRadius: "15px",
          boxShadow:
            "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2
  style={{
    color: "#1e40af",
  }}
>
  CIG Event Gallery
</h2>

        <p>
          Manage events, upload
          media, organize albums,
          and collaborate through
          a centralized dashboard.
        </p>
      </div>
    </DashboardLayout>
  );
}

export default DashboardPage;