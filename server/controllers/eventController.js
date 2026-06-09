import Event from "../models/Event.js";

// Create Event
export const createEvent = async (req, res) => {
  try {
    const event = await Event.create({
      ...req.body,
      createdBy: req.user._id,
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Events
export const getEvents = async (req, res) => {
  try {
    const { category, sort } = req.query;

    let query = {};

    if (category) {
      query.category = category;
    }

    let eventsQuery = Event.find(query).populate(
      "createdBy",
      "name email"
    );

    if (sort === "date") {
      eventsQuery = eventsQuery.sort({ date: 1 });
    } else if (sort === "newest") {
      eventsQuery = eventsQuery.sort({ createdAt: -1 });
    }

    const events = await eventsQuery;

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Update Event
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);

    if (!deletedEvent) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    res.status(200).json({
      message: "Event deleted successfully",
      deletedEvent,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};