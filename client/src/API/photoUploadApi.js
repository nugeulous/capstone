const API_URL = import.meta.env.VITE_API_URL || "/api";

export const uploadPhoto = async (formData) => {
  try {
      const response = await fetch(`${API_URL}/photos/upload-by-file`, {
          method: "POST",
          body: formData, // Pass the FormData object directly as the request body
      });
      const result = await response.json();
      return result;
  } catch (error) {
      console.error("Error uploading photo:", error);
      throw error;
  }
};