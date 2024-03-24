const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";
export const register = async (fname, lname, email, address, phone, password) => {
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
        address,
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

export const addPet = async (
  image,
  name,
  age,
  gender,
  breed,
  weight,
  favoriteToy,
  favoriteTreat,
  personality
) => {
  try {
    const response = await fetch(`${API_URL}/owners/addPet `, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image,
        name,
        age,
        gender,
        breed,
        weight,
        favoriteToy,
        favoriteTreat,
        personality,
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

export const fetchAccount = async (token) => {
  try {
    const response = await fetch(`${API_URL}/owners/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Please log in or create an account!");
    const owner = await response.json();
    console.log(owner);
    return owner;
  } catch (error) {
    console.error("Error fetching account:", error);
    throw error;
  }
};

// GET all sitters
export const fetchAllSitters = async (token) => {
  console.log('Token successfully made it to aPI call:', token)
  try {
    const response = await fetch(`${API_URL}/petsitters`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Please log in or create an account!");
    const petsitters = await response.json();
    console.log('petsitters response COMPLETE: ', petsitters);
    return petsitters;
  } catch (error) {
    console.error("Error fetching petsitter account:", error);
    throw error;
  }
};
