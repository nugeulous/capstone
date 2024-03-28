const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const createEvent = async (title, address, date, time, photos, description, event_type, pet_type, owner_id) => {
  try {
    const response = await fetch(`${API_URL}/events/new-event`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title, address, date, time, photos, description, event_type, pet_type, owner_id
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error from create event:", error);
    throw error;
  }
};

export const getAllEvents = async () => {
  try {
    const response = await fetch(`${API_URL}/events/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const events = await response.json();
    return events;
  } catch (error) {
    console.error("Error fetching all events:", error);
    throw error;
  }
};