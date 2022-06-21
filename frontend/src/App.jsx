import React from "react";
import { useForm } from "react-hook-form";

function App() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("myfile", data.file[0]);
    fetch("http://localhost:5050/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("file")} type="file" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
