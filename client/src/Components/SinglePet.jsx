const SinglePet = ({ pet }) => {

    const {name, animalType, age, gender, image, weight, breed, favoriteToy, favoriteTreat, personality } = pet;

  return (
   <div>
    <p>{image}</p>
    <p>Name: {name}</p>
    <p>Age: {age} </p>
    <p>Gender: {gender} </p>
    <p>Weight; {weight} </p>
    <p>Animal Type: {animalType} </p>
    <p>Breed: {breed} </p>
    <p>Favorite Toy: {favoriteToy} </p>
    <p>Favorite Treat: {favoriteTreat} </p>
    <p>Personality: {personality} </p>
   </div>
  );
}
export default SinglePet;