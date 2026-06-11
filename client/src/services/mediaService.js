import axios from "axios";

const API_URL =
  "https://cig-backend-xr8z.onrender.com/api/media";

export const uploadMedia =
  async (
    files,
    eventId,
    visibility
  ) => {
    const token =
      localStorage.getItem(
        "token"
      );

    const formData =
      new FormData();

    files.forEach(
      (file) => {
        formData.append(
          "file",
          file
        );
      }
    );

    formData.append(
      "eventId",
      eventId
    );

    formData.append(
      "visibility",
      visibility
    );

    const response =
      await axios.post(
        `${API_URL}/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data;
  };

export const getAllMedia =
  async () => {
    const response =
      await axios.get(
        API_URL
      );

    return response.data;
  };

export const getMediaByEvent =
  async (
    eventId
  ) => {
    const response =
      await axios.get(
        `${API_URL}/event/${eventId}`
      );

    return response.data;
  };

export const likeMedia =
  async (
    mediaId
  ) => {
    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await axios.put(
        `${API_URL}/like/${mediaId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };

export const favoriteMedia =
  async (
    mediaId
  ) => {
    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await axios.put(
        `${API_URL}/favorite/${mediaId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };

export const searchMedia =
  async (
    params
  ) => {
    const response =
      await axios.get(
        `${API_URL}/search`,
        {
          params,
        }
      );

    return response.data;
  };

export const deleteMedia =
  async (mediaId) => {
    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await axios.delete(
        `${API_URL}/${mediaId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };
  export const tagUser =
  async (
    mediaId,
    userName
  ) => {
    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await axios.put(
        `${API_URL}/tag/${mediaId}`,
        {
          userName,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };