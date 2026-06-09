import {
  useEffect,
  useState,
} from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import { getAnalytics } from "../services/analyticsService";

function AnalyticsPage() {
  const [analytics, setAnalytics] =
    useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics =
    async () => {
      try {
        const data =
          await getAnalytics();

        setAnalytics(data);
      } catch (error) {
        console.error(error);
      }
    };

  if (!analytics) {
    return (
      <DashboardLayout>
        <h2>
          Loading Analytics...
        </h2>
      </DashboardLayout>
    );
  }

  const cardStyle = {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow:
      "0 2px 10px rgba(0,0,0,0.1)",
    minWidth: "220px",
  };

  return (
    <DashboardLayout>
      <h1
  style={{
    color: "#1e40af",
    marginBottom: "25px",
  }}
>
  📊 Analytics Dashboard
</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "20px",
        }}
      >
        <div style={cardStyle}>
          <h3>Total Events</h3>
          <h1>
            {
              analytics.totalEvents
            }
          </h1>
        </div>

        <div style={cardStyle}>
          <h3>Total Media</h3>
          <h1>
            {
              analytics.totalMedia
            }
          </h1>
        </div>

        <div style={cardStyle}>
          <h3>
            Total Comments
          </h3>
          <h1>
            {
              analytics.totalComments
            }
          </h1>
        </div>

        <div style={cardStyle}>
          <h3>Total Likes</h3>
          <h1>
            {
              analytics.totalLikes
            }
          </h1>
        </div>

        <div style={cardStyle}>
          <h3>
            Total Favorites
          </h3>
          <h1>
            {
              analytics.totalFavorites
            }
          </h1>
        </div>

        <div style={cardStyle}>
          <h3>Images</h3>
          <h1>
            {analytics.images}
          </h1>
        </div>

        <div style={cardStyle}>
          <h3>Videos</h3>
          <h1>
            {analytics.videos}
          </h1>
        </div>

        <div style={cardStyle}>
          <h3>
            Public Media
          </h3>
          <h1>
            {
              analytics.publicMedia
            }
          </h1>
        </div>

        <div style={cardStyle}>
          <h3>
            Private Media
          </h3>
          <h1>
            {
              analytics.privateMedia
            }
          </h1>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AnalyticsPage;