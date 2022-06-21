import React, { useState } from "react";
import { useForm } from "react-hook-form";

function App() {
  const { register, handleSubmit } = useForm();
  const [image, setImage] = useState();
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("myfile", data.file[0]);
    fetch("http://localhost:5050/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => setImage(data.url))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("file")} type="file" />
        <button type="submit">Submit</button>
      </form>
      <img src={image} alt="En attente d'une image" />
    </div>
  );
}

export default App;
