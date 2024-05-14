import React from "react";
import { useState, useEffect } from "react";
import { returnChef } from "./RecipeCard";
import { commentType, chefType } from "@/app/schema/recipe";
import { format } from "date-fns";
import Image from "next/image";

const CommentCard = ({ comment }: { comment: commentType }) => {
  const [poster, setPoster] = useState<chefType | null>(null);

  // Function to fetch the poster
  const fetchPoster = () => {
    // Return a promise chain using .then
    const poster = returnChef(comment.user_id);
    setPoster(poster);
    /*  return returnChef(comment.user_id).then((posterr: chefType) => {
      // Once data is fetched, set the poster state
      setPoster(posterr);
    }); */
  };

  // Use useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchPoster();
  }, [fetchPoster]);
  return (
    <div className="bg-pink-500 rounded-lg flex flex-col gap-3 p-4 text-white">
      <div className="flex justify-between">
        <div className="flex gap-6">
          <Image
            src={"/noavatar.png"}
            alt=""
            width={60}
            height={40}
            className="rounded-full w-12 h-12"
          />
          <div className="text-xl font-bold">{poster?.username}</div>
        </div>

        <div className="text-lg font-bold">
          {format(new Date(comment.created_at), "MMMM dd, yyyy")}
        </div>
      </div>
      <div>{comment.content}</div>
    </div>
  );
};

export default CommentCard;
