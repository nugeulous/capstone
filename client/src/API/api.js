const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
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
    const result = await response.json();
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
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("error from register");
    throw error;
  }
};

export const fetchOwner = async (token) => {
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
    return owner;
  } catch (error) {
    console.error("Error fetching account:", error);
    throw error;
  }
};

export const petsitterRegister = async (fname, lname, email, address, phone, password) => {
  try {
    const response = await fetch(`${API_URL}/petsitters/register`, {
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
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("error from register");
    throw error;
  }
};

export const petsitterLogin = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/petsitters/login`, {
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

export const fetchPetsitter = async (token) => {
  try {
    const response = await fetch(`${API_URL}/petsitters/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Please log in or create an account!");
    const petsitter = await response.json();
    return petsitter;
  } catch (error) {
    console.error("Error fetching account:", error);
    throw error;
  }
};
