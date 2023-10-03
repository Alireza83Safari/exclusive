import React from "react";

function NotFound() {
  return (
    <section className="max-w-[1170px] mx-auto mt-20 relative text-center my-10">
      <h1 className=" text-8xl font-semibold mb-10">404 Not Found</h1>
      <p className="mb-10">
        Your visited page not found. You may go home page.
      </p>
      <button className="bg-red text-white py-3 px-8 mt-10">
        View All Products
      </button>
    </section>
  );
}

export default NotFound;
