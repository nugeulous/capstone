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
  sterile,
  breed,
  animalType,
  weight,
  favoriteToy,
  favoriteTreat,
  personality,
  pet_owner_id
) => {
  try {
    const response = await fetch(`${API_URL}/pets/addPet `, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image,
        name,
        age,
        gender,
        sterile,
        breed,
        animalType,
        weight,
        favoriteToy,
        favoriteTreat,
        personality,
        pet_owner_id
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

export const fetchAvailablePetsitters = async (token) => {
  try {
    const response = await fetch(`${API_URL}/availability/petsitters`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });
    console.log('CONVERTED TO JSON--->', response);
    if (!response.ok) throw new Error("Please log in or create an account!");
    const petsitters = await response.json();
    return petsitters;
  } catch (error) {
    console.error("Error fetching petsitter account:", error);
    throw error;
  }
};
