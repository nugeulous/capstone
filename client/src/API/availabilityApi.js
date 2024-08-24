const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

export const addAvailability = async ({petsitter_id,
    start_date,
    end_date,
    start_time,
    end_time}) => {
    try {
      const response = await fetch(`${API_URL}/availability/addavailability`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            petsitter_id,
            start_date,
            end_date,
            start_time,
            end_time
        }),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Unable to post new availability", error.message);
      throw error;
    }
  };

export const fetchPetsitterAvailabilityById = async function(userId) {
    try {
      const response = await fetch(`${API_URL}/availability/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Petsitter not found");
      const petsitter = await response.json();
      return petsitter;
    } catch (error) {
      console.error("Unable to post new availability", error.message);
      throw error;
    }
  };