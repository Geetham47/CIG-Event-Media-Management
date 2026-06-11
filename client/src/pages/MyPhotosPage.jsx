import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../layouts/DashboardLayout";

function MyPhotosPage() {
  const [photos, setPhotos] =
    useState([]);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await axios.get(
            "https://cig-backend-xr8z.onrender.com/api/media/my-photos",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setPhotos(
          response.data
        );
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <DashboardLayout>
      <h2>My Photos</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill,minmax(250px,1fr))",
          gap: "20px",
        }}
      >
        {photos.map(
          (photo) => (
            <img
              key={
                photo._id
              }
              src={
                photo.fileUrl
              }
              alt=""
              style={{
                width:
                  "100%",
                borderRadius:
                  "10px",
              }}
            />
          )
        )}
      </div>
    </DashboardLayout>
  );
}

export default MyPhotosPage;