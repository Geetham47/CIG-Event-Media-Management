import { useState } from "react";
import { createEvent } from "../services/eventService";

function CreateEventForm({ onEventCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventData = {
      title,
      description,
      date,
      location,
      category,
    };

    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMTgyZTliMTIyNTk4YzI4YTU3Njk1NyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc4MDE2MjEyNCwiZXhwIjoxNzgwNzY2OTI0fQ.uDLSLe67Bp5rxNw0nr77ugi6DpGhI7b-FNNWAQKGvkc";

      const response = await createEvent(eventData, token);

      console.log("Created Event:", response);

      alert("Event created successfully!");
      onEventCreated();

      setTitle("");
      setDescription("");
      setDate("");
      setLocation("");
      setCategory("");
    } catch (error) {
      console.error(error);
      alert("Failed to create event");
    }
  };

  return (
    <div className="event-card">
      <h2>Create Event</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br />
        <br />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <br />
        <br />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <br />
        <br />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <br />
        <br />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <br />
        <br />

        <button type="submit">Create Event</button>
      </form>
    </div>
  );
}

export default CreateEventForm;