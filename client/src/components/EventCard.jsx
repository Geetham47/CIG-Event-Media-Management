import { useState } from "react";
import { getMediaByEvent } from "../services/mediaService";
import {
  deleteEvent,
  updateEvent,
} from "../services/eventService";
import "./EventCard.css";

function EventCard({ event }) {
  const [album, setAlbum] = useState([]);
  const [showAlbum, setShowAlbum] = useState(false);
  const [editing, setEditing] =
  useState(false);

const [editData, setEditData] =
  useState({
    title: event.title,
    description:
      event.description,
    location:
      event.location,
    category:
      event.category,
  });
  const user = JSON.parse(
  localStorage.getItem("user")
);
  const handleViewAlbum = async () => {
    try {
      const media = await getMediaByEvent(
        event._id
      );

      setAlbum(media);
      setShowAlbum(true);
    } catch (error) {
      console.error(error);
    }
  };
const handleDelete = async () => {
  try {
    const token =
      localStorage.getItem("token");

    await deleteEvent(
      event._id,
      token
    );

    alert(
      "Event deleted successfully"
    );

    window.location.reload();
  } catch (error) {
    console.error(error);

    alert(
      "Failed to delete event"
    );
  }
};
const handleEdit = async () => {
  try {
    const token =
      localStorage.getItem(
        "token"
      );

    await updateEvent(
      event._id,
      editData,
      token
    );

    alert(
      "Event updated successfully"
    );

    window.location.reload();
  } catch (error) {
    console.error(error);

    alert(
      "Failed to update event"
    );
  }
};
  return (
    <div
  className="event-card"
  style={{
    background: "white",
    padding: "25px",
    borderRadius: "15px",
    boxShadow:
      "0 4px 15px rgba(0,0,0,0.15)",
    border: "1px solid #e5e7eb",
    minHeight: "220px",
  }}
>
      <h2>{event.title}</h2>

      <p>{event.description}</p>

      <p>
        <strong>Location:</strong>{" "}
        {event.location}
      </p>

      <p>
        <strong>Category:</strong>{" "}
        {event.category}
      </p>

      <button
  onClick={handleViewAlbum}
>
  View Album
</button>
{(user?.role === "admin" ||
  user?.role ===
    "photographer") && (
  <button
    onClick={() =>
      setEditing(true)
    }
    style={{
      marginLeft: "10px",
    }}
  >
    Edit Event
  </button>
)}

{user?.role === "admin" && (
  <button
    onClick={handleDelete}
    style={{
      marginLeft: "10px",
      background: "red",
      color: "white",
    }}
  >
    Delete Event
  </button>
)}
{editing && (
  <div
    style={{
      border:
        "1px solid #ccc",
      padding: "15px",
      marginTop: "15px",
      borderRadius: "8px",
    }}
  >
    <h3>Edit Event</h3>

    <input
      value={editData.title}
      onChange={(e) =>
        setEditData({
          ...editData,
          title:
            e.target.value,
        })
      }
      placeholder="Title"
    />

    <br />
    <br />

    <input
      value={
        editData.description
      }
      onChange={(e) =>
        setEditData({
          ...editData,
          description:
            e.target.value,
        })
      }
      placeholder="Description"
    />

    <br />
    <br />

    <input
      value={
        editData.location
      }
      onChange={(e) =>
        setEditData({
          ...editData,
          location:
            e.target.value,
        })
      }
      placeholder="Location"
    />

    <br />
    <br />

    <select
      value={
        editData.category
      }
      onChange={(e) =>
        setEditData({
          ...editData,
          category:
            e.target.value,
        })
      }
    >
      <option value="Technical">
        Technical
      </option>

      <option value="Cultural">
        Cultural
      </option>

      <option value="Workshop">
        Workshop
      </option>

      <option value="Sports">
        Sports
      </option>

      <option value="Other">
        Other
      </option>
    </select>

    <br />
    <br />

    <button
      onClick={handleEdit}
    >
      Save Changes
    </button>

    <button
      onClick={() =>
        setEditing(false)
      }
      style={{
        marginLeft: "10px",
      }}
    >
      Cancel
    </button>
  </div>
)}
      {showAlbum && (
        <div
          style={{
            marginTop: "20px",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill,minmax(250px,1fr))",
            gap: "15px",
          }}
        >
          {album.length === 0 ? (
            <p>No media found.</p>
          ) : (
            album.map((item) => (
              <div key={item._id}>
                {item.fileType ===
                "video" ? (
                  <video
                    src={item.fileUrl}
                    controls
                    width="250"
                  />
                ) : (
                  <img
                    src={item.fileUrl}
                    alt="Media"
                    width="250"
                  />
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default EventCard;