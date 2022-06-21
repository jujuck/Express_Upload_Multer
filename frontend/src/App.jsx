import React from "react";
import { useForm } from "react-hook-form";

function App() {
  const { register, handleSubmit } = useForm();
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
