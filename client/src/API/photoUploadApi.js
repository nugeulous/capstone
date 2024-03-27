const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const uploadPhoto = async (link) => {
  try {
    const response = await fetch(`${API_URL}/uploads/upload-by-link`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        link
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error from create event:", error);
    throw error;
  }
};