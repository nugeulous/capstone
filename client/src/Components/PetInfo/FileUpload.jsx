

const FileUpload = ({ file, setFile }) => {
  return (
    <div>

      {file && (
        <div>
          <img
            alt="not found"
            src={URL.createObjectURL(file)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "inherit",
              borderRadius: 20,
            }}
          />
          <br />
          <button onClick={() => setFile(null)}>Remove</button>
        </div>
      )}

      <br />
      <br />
      
      <input
        type="file"
        name="myFile"
        onChange={(event) => {
          console.log(event.target.files[0]);
          setFile(event.target.files[0]);
        }}
      />
    </div>
  );
};

export default FileUpload;