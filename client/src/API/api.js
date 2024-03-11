const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/";
export const register = async (
  firstname,
  lastname,
  email,
  phonenumber,
  password
) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        phonenumber,
        password,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("error from register");
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("error from login");
    throw error;
  }
};
