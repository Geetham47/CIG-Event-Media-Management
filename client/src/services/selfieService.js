import axios from "axios";

const API_URL =
  "https://cig-backend-xr8z.onrender.com/api/users";

export const uploadSelfie =
  async (file) => {
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
        `${API_URL}/upload-selfie`,
        formData,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };