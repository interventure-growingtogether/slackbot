const Event = require('./event.model');

// Fetch all events
const findAllEvents = () => Event.find({});

// Add event
const addEvent = (title, description, date) => {
  const event = new Event({
    title,
    description,
    date
  });
  return event.save();
};

// Change event
const updateEvent = (id, params) => Event.findByIdAndUpdate(id, params);

// Delete event
const deleteEvent = (id) => Event.findByIdAndDelete(id);

// Mark it finished
// TODO

module.exports = {
  findAllEvents,
  addEvent,
  updateEvent,
  deleteEvent
};
