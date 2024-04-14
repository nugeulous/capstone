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
    console.log('OWNER: ', owner)
    return owner;
  } catch (error) {
    console.error("Error fetching account:", error);
    throw error;
  }
};

export const addPet = async ({
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
  ownerId}
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
        ownerId
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("error from register");
    throw error;
  }
};

export const getPetById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/pets/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const pet = await response.json();
    return pet;
  } catch (error) {
    console.error("Error fetching event by ID:", error);
    throw error;
  }
};

export const getPetsByOwnerId = async (ownerId) => {
  try {
    const response = await fetch(`${API_URL}/pets/owner/${ownerId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",

      },
    });
    const pets = await response.json();
    return pets;
  } catch (error) {
    console.error("Error fetching pets by owner ID:", error);
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

export const createPost = async ({ title, content, ownerid, petsitterid }) => {
  try {
    const response = await fetch(`${API_URL}/posts/createPost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
        ownerid,
        petsitterid,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("error creating post");
    throw error;
  }
};

export const getAllPosts = async () => {
  try {
    const response = await fetch(`${API_URL}/posts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error("error fetching posts");
    throw error;
  }
};

export const deletePost = async (postId) => {
  try {
    const response = await fetch(`${API_URL}/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to delete post");
    }
  } catch (error) {
    console.error("error deleting post");
    throw error;
  }
};

export const fetchOrdersByOwnerId = async (id) => {
  try {
    const response = await fetch(`${API_URL}/orders/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });
 
    if (!response.ok) throw new Error("Please log in or create an account!");
    const orders = await response.json();
    console.log(orders)
    return orders;
  } catch (error) {
    console.error("Error fetching orders by owner id:", error);
        throw error;
  }
};
export const getPetsitterById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/petsitters/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const petsitter = await response.json();
    return petsitter;
  } catch (error) {
    console.error("Error fetching petsitter by ID:", error);
    throw error;
  }
};

export const getUserById = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/owners/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("User not found");
    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const addAvailability = async ({
    petsitterId,
    startDate, 
    endDate, 
    startTime, 
    endTime }
  ) => {
  try {
    const response = await fetch(`${API_URL}/availability/addAvailability `, {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({
        petsitterId,
        startDate, 
        endDate, 
        startTime, 
        endTime
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("error: unable to add availability");
    throw error;
  }
};