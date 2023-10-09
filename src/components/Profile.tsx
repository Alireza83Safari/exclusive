import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logoutHandler } from "../Redux/Store/auth";

function Profile({ toggleProfile }) {
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(logoutHandler(false) as any);
  };

  return (
    <section
      className="absolute top-20 sm:right-8 righ-0 bg-gradient-to-br from-[#8A808B] grad z-10 bg-[#423A44] w-52 text-white px-4 py-2 rounded-md"
      onMouseLeave={toggleProfile}
    >
      <Link className="flex items-center my-3" to="/account">
        <img
          src="/images/user.png"
          alt=""
          className="w-6 h-6 object-contain mr-2"
        />
        <p>Manage My Account</p>
      </Link>
      <Link className="flex items-center my-3" to="/account">
        <img
          src="/images/box.png"
          alt=""
          className="w-6 h-6 object-contain mr-2"
        />
        <p>My Order</p>
      </Link>
      <Link className="flex items-center my-3" to="/account">
        <img
          src="/images/delete.png"
          alt=""
          className="w-6 h-6 object-contain mr-2"
        />
        <p>My Cancellations</p>
      </Link>
      <Link className="flex items-center my-3" to="/account">
        <img
          src="/images/star1.png"
          alt=""
          className="w-6 h-6 object-contain mr-2"
        />
        <p>My Reviews</p>
      </Link>
      <Link className="flex items-center my-3" onClick={logOut}>
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
