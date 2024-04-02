import { useState } from "react";
import { Link } from "react-router-dom"
import { getPetById } from "../../API/api";
const SinglePet = () => {
  const [pet, setPet] = useState()

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await getPetById(id);
        setPet(response);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchPet();
  }, [id]);

  return (
   <div>
     <Link to={`/pets/${pet.id}`}>
      <div>
    <p>{pet.image}</p>
    <p>Name: {pet.name}</p>
    <p>Age: {pet.age} </p>
    <p>Gender: {pet.gender} </p>
    <p>Weight; {pet.weight} </p>
    <p>Animal Type: {pet.animalType} </p>
    <p>Breed: {pet.breed} </p>
    <p>Favorite Toy: {pet.favoriteToy} </p>
    <p>Favorite Treat: {pet.favoriteTreat} </p>
    <p>Personality: {pet.personality} </p>
    </div>
    </Link>
   </div>
  );
}
export default SinglePet;