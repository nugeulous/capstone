import { useState, useEffect } from "react";
import { getPetsByOwnerId } from "../../API/api";
const SinglePet = ({ user }) => {
  const [pets, setPets] = useState([]);
  const [error, setError] = useState(null);

  const ownerId = user.id;

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const petsData = await getPetsByOwnerId(ownerId);
        setPets(petsData);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchPets();
  }, [ownerId]);

  return (
    <div>
      {pets.map((pet) => (
        <div key={pet.id}>
          <p>{pet.image}</p>
          <p>Name: {pet.name}</p>
          <p>Age: {pet.age} </p>
          <p>Gender: {pet.gender} </p>
          <p>Weight; {pet.weight} </p>
          <p>Animal Type: {pet.animaltype} </p>
          <p>Breed: {pet.breed} </p>
          <p>Favorite Toy: {pet.favoritetoy} </p>
          <p>Favorite Treat: {pet.favoritetreat} </p>
          <p>Personality: {pet.personality} </p>
        </div> 
       ))} 
      {error && <p>Error: {error}</p>}
    </div>
  );
};
export default SinglePet;