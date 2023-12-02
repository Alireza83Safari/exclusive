import { Link, useNavigate } from "react-router-dom";
import { useUserLogoutMutation } from "../Redux/apis/user/authUserApi";
import { useContext } from "react";
import toast from "react-hot-toast";
import { authContext, authContextType } from "../context/authContext";

function Profile({ toggleProfile }: any) {
  const navigate = useNavigate();
  const { setUserIsLogin } = useContext(authContext) as authContextType;
  const [userLogout] = useUserLogoutMutation();
  const logOut = () => {
    userLogout("");
    navigate("/login");
    setUserIsLogin(false);
    toast.success("logout is succes");
  };

  return (
    <section
      className="absolute top-7 sm:right-0 right-1 bg-gradient-to-br from-[#8A808B] grad z-10 bg-[#423A44] w-52 text-white px-4 py-2 rounded-md"
      onMouseLeave={toggleProfile}
    >
      <Link className="flex items-center my-3" to="/account">
        <img src="/images/user.png" className="w-6 h-6 object-contain mr-2" />
        <p>Manage My Account</p>
      </Link>

      <Link className="flex items-center my-3" to="/account/order">
        <img src="/images/box.png" className="w-6 h-6 object-contain mr-2" />
        <p>My Order</p>
      </Link>

      <Link className="flex items-center my-3" to="/account/comment">
        <img src="/images/star1.png" className="w-6 h-6 object-contain mr-2" />
        <p>My Reviews</p>
      </Link>

      <button className="flex items-center my-3" onClick={logOut}>
        <img src="/images/logout.png" className="w-6 h-6 object-contain mr-2" />
        <p>Logout</p>
      </button>
    </section>
  );
}

export default Profile;
