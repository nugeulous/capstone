const API_URL = import.meta.env.VITE_API_URL || "/api";

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

export const getAllLikedEventsByUser = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/events/${userId}/liked-events`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const likedEvents = await response.json();
    return likedEvents;
  } catch (error) {
    console.error("Error fetching all liked events by user:", error);
    throw error;
  }
};

export const addUserLikedEvent = async (userId, eventId) => {
  try {
    const response = await fetch(`${API_URL}/events/${userId}/liked-events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ eventId }),
    });
    const data = await response.json();
    return data;
} catch (error) {
    console.error("Error adding event to favorites:", error);
    throw error;
}
};

