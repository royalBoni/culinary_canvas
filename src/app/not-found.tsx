import React from "react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center text-white p-24 radial">
      <h2>Page Not Found</h2>
      <p>Sorry, the page you are looking for does not exist</p>
    </div>
  );
};

export default NotFound;
