import React from "react";
import { useForm } from "react-hook-form";

function App() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();
    console.log(data);
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
