import { useEffect, useState } from "react";
import { getEvents } from "../services/eventService";
import EventCard from "../components/EventCard";
import CreateEventForm from "../components/CreateEventForm";
import DashboardLayout from "../layouts/DashboardLayout";

function EventDashboard() {
  const [events, setEvents] = useState([]);
const user = JSON.parse(
  localStorage.getItem("user")
);
  const fetchEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <DashboardLayout>
      <h1
  style={{
    marginBottom: "30px",
    color: "#1e40af",
    fontSize: "2.5rem",
  }}
>
  Event Dashboard
</h1>

      {user?.role === "admin" && (
  <CreateEventForm
    onEventCreated={fetchEvents}
  />
)}

      {events.length === 0 ? (
  <p>No events found.</p>
) : (
  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit, minmax(350px, 1fr))",
      gap: "25px",
      marginTop: "25px",
    }}
  >
   <div
  style={{
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(400px,1fr))",
    gap: "25px",
    marginTop: "25px",
  }}
>
  {events.map((event) => (
    <EventCard
      key={event._id}
      event={event}
    />
  ))}
</div>
  </div>
)}
    </DashboardLayout>
  );
}

export default EventDashboard;