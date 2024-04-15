const SinglePet = ({ pet }) => {
  const API_URL = import.meta.env.VITE_API_URL || "/api";
  const photoPath = `${API_URL}/pets/getPhoto?fileName=`
  const imagePath = photoPath + pet.file;
  return (
    <div>
        <div >
          <img src={imagePath} alt={pet.name}   style={{ maxHeight: "200px", maxWidth: "200px",  objectFit: "cover" }} />
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
    </div>
  );
};
export default SinglePet;