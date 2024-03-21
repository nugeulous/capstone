const SinglePet = ({ pet }) => {

    const {name, age, gender, image, weight, breed, favoriteToy, favoriteTreat, personality } = pet;

  return (
   <div>
    <p>{image}</p>
    <p>Name: {name}</p>
    <p>Age: {age} </p>
    <p>Gender: {gender} </p>
    <p>Weight; {weight} </p>
    <p>Breed: {breed} </p>
    <p>Favorite Toy: {favoriteToy} </p>
    <p>Favorite Treat: {favoriteTreat} </p>
    <p>Personality: {personality} </p>
   </div>
  );
}
export default SinglePet;