import axios from "axios";

const API_URL =
  "http://localhost:5000/api/comments";

export const createComment = async (
  text,
  mediaId
) => {
  const response = await axios.post(
    API_URL,
    {
      text,
      mediaId,
    }
  );

  return response.data;
};

export const getComments = async (
  mediaId
) => {
  const response = await axios.get(
    `${API_URL}/${mediaId}`
  );

  return response.data;
};