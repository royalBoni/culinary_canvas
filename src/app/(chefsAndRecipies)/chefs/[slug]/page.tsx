"use client";
import React from "react";
import { getChef } from "@/lib/actions";
import { getChefPostedCategories } from "@/lib/actions";
import ChefChildPage from "@/components/ChefChildPage";

type SlugType = {
  slug: number;
};

const ChefProfilePage = ({ params }: { params: SlugType }) => {
  const { slug } = params;

  const chef = getChef(slug);
  const chefCategories = getChefPostedCategories(slug);

  return (
    <ChefChildPage
      chef={chef}
      recipiesAndCategory={chefCategories}
      params={params}
    />
  );
};

export default ChefProfilePage;
