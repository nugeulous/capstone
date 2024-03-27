import { useState } from "react";

const ImageUpload = () => {

  const [image, setImage] = useState(null);

  return (
    <div>
      {image && (
        <div>
          <img
            alt="not found"
            width={"250px"}
            src={URL.createObjectURL(image)}
          />
          <br />
          <button onClick={() => setImage(null)}>Remove</button>
        </div>
      )}

      <br />
      <br />
      
      <input
        type="file"
        name="myImage"
        onChange={(event) => {
          setImage(event.target.files[0]);
        }}
      />
    </div>
  );
};

export default ImageUpload;