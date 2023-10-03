import React from "react";
import { Link } from "react-router-dom";

function Profile() {
  return (
    <section className="absolute top-20 right-28 bg-gradient-to-br from-[#8A808B] grad z-10 bg-[#423A44] w-52 text-white px-4 py-2 rounded-md">
      <Link className="flex items-center my-3">
        <img
          src="/images/user.png"
          alt=""
          className="w-6 h-6 object-contain mr-2"
        />
        <p>Manage My Account</p>
      </Link>
      <Link className="flex items-center my-3">
        <img
          src="/images/box.png"
          alt=""
          className="w-6 h-6 object-contain mr-2"
        />
        <p>My Order</p>
      </Link>
      <Link className="flex items-center my-3">
        <img
          src="/images/delete.png"
          alt=""
          className="w-6 h-6 object-contain mr-2"
        />
        <p>My Cancellations</p>
      </Link>
      <Link className="flex items-center my-3">
        <img
          src="/images/star1.png"
          alt=""
          className="w-6 h-6 object-contain mr-2"
        />
        <p>My Reviews</p>
      </Link>
      <Link className="flex items-center my-3">
        <img
          src="/images/logout.png"
          alt=""
          className="w-6 h-6 object-contain mr-2"
        />
        <p>Logout</p>
      </Link>
    </section>
  );
}

export default Profile;
