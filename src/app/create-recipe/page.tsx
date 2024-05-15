import React from "react";
import CreateRecipeForm from "@/components/forms/CreateRecipeForm";

const CreateRecipePage = () => {
  return (
    <div className="flex flex-col gap-10 radial min-h-screen p-14">
      {" "}
      <CreateRecipeForm />
    </div>
  );
};

export default CreateRecipePage;
