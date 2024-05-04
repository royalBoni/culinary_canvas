import React from "react";

type SlugType = {
  slug: number;
};

const SingleRecipe = ({ params }: { params: SlugType }) => {
  const { slug } = params;

  return <div>this is recipe with id {slug} page</div>;
};

export default SingleRecipe;
