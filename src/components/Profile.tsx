import { Link, useNavigate } from "react-router-dom";
import { useUserLogoutMutation } from "../Redux/apis/user/authUserApi";
import { useEffect } from "react";
import toast from "react-hot-toast";

function Profile({ toggleProfile }: any) {
  const navigate = useNavigate();
  const [userLogout, { isSuccess }] = useUserLogoutMutation();
  const logOut = () => {
    userLogout("");
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
      toast.success("logout is succes");
    }
  }, [isSuccess]);

  return (
    <section
      className="absolute top-16 sm:right-4 righ-0 bg-gradient-to-br from-[#8A808B] grad z-10 bg-[#423A44] w-52 text-white px-4 py-2 rounded-md"
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

      <Link className="flex items-center my-3" to="/account/order">
        <img
          src="/images/box.png"
          alt=""
          className="w-6 h-6 object-contain mr-2"
        />
        <p>My Order</p>
      </Link>

      <Link className="flex items-center my-3" to="/account/comment">
        <img
          src="/images/star1.png"
          alt=""
          className="w-6 h-6 object-contain mr-2"
        />
        <p>My Reviews</p>
      </Link>

      <div className="flex items-center my-3" onClick={logOut}>
        <img
          src="/images/logout.png"
          alt=""
          className="w-6 h-6 object-contain mr-2"
        />
        <p>Logout</p>
      </div>
    </section>
  );
}

export default Profile;
