import React, { useState } from "react";

const ImageUpload = ({ image, setImage }) => {
  return (
    <div>

      {image && (
        <div>
          <img
            alt="not found"
            width={"500px"}
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
          console.log(event.target.files[0]);
          setSelectedImage(event.target.files[0]);
        }}
      />
    </div>
  );
};

export default ImageUpload;