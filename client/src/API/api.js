const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:3000/api";
export const register = async (
  fname,
  lname,
  email,
  phone,
  password
) => {
  try {
    const response = await fetch(`${API_URL}/owners/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fname,
        lname,
        email,
        phone,
        password,
      }),
    });
    console.log(response);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error("error from register");
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/owners/login`, {
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

