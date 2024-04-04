const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

export const createEvent = async (eventData) => {
  try {
    const formData = new FormData();
    for (const key in eventData) {
      formData.append(key, eventData[key]);
    }
    const response = await fetch(`${API_URL}/events/new-event`, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error from create event:", error);
    throw error;
  }
}

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

export const getEventById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/events/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const event = await response.json();
    return event;
  } catch (error) {
    console.error("Error fetching event by ID:", error);
    throw error;
  }
};