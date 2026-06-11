import axios from "axios";

const API_URL =
  "https://cig-backend-xr8z.onrender.com/api/analytics";

export const getAnalytics =
  async () => {
    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await axios.get(
        API_URL,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };