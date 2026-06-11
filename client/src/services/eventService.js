import axios from "axios";

const API_URL = "https://cig-backend-xr8z.onrender.com/api/events";

export const getEvents = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createEvent = async (eventData, token) => {
  const response = await axios.post(
    API_URL,
    eventData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
export const deleteEvent = async (
  eventId,
  token
) => {
  const response =
    await axios.delete(
      `${API_URL}/${eventId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

  return response.data;
};
export const updateEvent = async (
  eventId,
  eventData,
  token
) => {
  const response =
    await axios.put(
      `${API_URL}/${eventId}`,
      eventData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

  return response.data;
};