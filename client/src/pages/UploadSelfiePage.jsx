import { useState } from "react";
import axios from "axios";
import DashboardLayout from "../layouts/DashboardLayout";

function UploadSelfiePage() {
  const [file, setFile] = useState(null);
  const [message, setMessage] =
    useState("");

  const handleUpload =
    async () => {
      if (!file) {
        setMessage(
          "Please select a selfie"
        );
        return;
      }

      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const formData =
          new FormData();

        formData.append(
          "selfie",
          file
        );

        const response =
          await axios.post(
            "http://localhost:5000/api/users/upload-selfie",
            formData,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
                "Content-Type":
                  "multipart/form-data",
              },
            }
          );

        setMessage(
          response.data.message
        );
      } catch (error) {
        console.error(error);
        setMessage(
          "Upload failed"
        );
      }
    };

  return (
    <DashboardLayout>
      <h2>
        Upload Reference Selfie
      </h2>

      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          setFile(
            e.target.files[0]
          )
        }
      />

      <br />
      <br />

      <button
        onClick={handleUpload}
      >
        Upload Selfie
      </button>

      <p>{message}</p>
    </DashboardLayout>
  );
}

export default UploadSelfiePage;