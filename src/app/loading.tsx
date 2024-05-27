import React from "react";

const Loading = () => (
  <div className=" w-100 flex text-4xl items-center h-full w-full justify-center text text-gray-500">
    Loading
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="75"
      height="75"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="lucide lucide-loader-circle animate-spin text-gray-500"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  </div>
);

export default Loading;
