import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { authContext, authContextType } from "../../context/authContext";
import { authUserApi } from "../../Redux";
import { appRoutes } from "../../routes/appRoutes";

function Profile({ toggleProfile }: { toggleProfile: () => void }) {
  const navigate = useNavigate();
  const { setUserIsLogin } = useContext(authContext) as authContextType;
  const [userLogout] = authUserApi.useUserLogoutMutation();
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
      <Link className="flex items-center my-3" to={appRoutes.ACCOUNT}>
        <img src="/images/user.png" className="w-6 h-6 object-contain mr-2" />
        <p>Manage My Account</p>
      </Link>

      <Link className="flex items-center my-3" to={appRoutes.ACCOUNT_ORDER}>
        <img src="/images/box.png" className="w-6 h-6 object-contain mr-2" />
        <p>My Order</p>
      </Link>

      <Link className="flex items-center my-3" to={appRoutes.ACCOUNT_COMMENT}>
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
