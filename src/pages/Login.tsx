import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner/Spinner";
import { userLoginHandler } from "../Redux/Store/auth";
import { userLoginType } from "../types/Auth.type";
import { rootState } from "../Redux/Store";

function Login() {
  const dispatch = useDispatch();
  const { loading, loginError } = useSelector((state: rootState) => state.auth);

  const [loginInfos, setLoginInfos] = useState<userLoginType>({
    username: "",
    password: "",
  });

  const getInfoFromInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginInfos({
      ...loginInfos,
      [name]: value,
    });
  };
  const isSubmitDisabled =
    loginInfos.username.length < 7 || loginInfos.password.length < 7;

  const loginUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(userLoginHandler(loginInfos) as any);
  };

  return (
    <section className="max-w-[1170px] mx-auto relative lg:mt-10">
      {loading ? (
        <Spinner />
      ) : (
        <div className="grid md:grid-cols-2 grid-cols-1">
          <div className="">
            <img src="/images/register.png" alt="" />
          </div>
          <div className="lg:px-16 md:px-8 px-3 lg:mt-8 mt-10">
            <form action="" onSubmit={loginUser}>
              <h1 className="sm:text-4xl text-3xl">Log in to Exclusive</h1>
              <p className="my-5">Enter your details below</p>
              <div className="border-b border-borderColor py-5">
                <input
                  type="text"
                  name="username"
                  className="outline-none py-3"
                  placeholder="Email or Phone Number"
                  onChange={getInfoFromInput}
                  value={loginInfos?.username}
                />
              </div>
              <p className="text-red text-xs">{loginError?.errors?.username}</p>
              <div className="border-b border-borderColor py-5">
                <input
                  type="password"
                  name="password"
                  className="outline-none py-3"
                  placeholder="Password"
                  onChange={getInfoFromInput}
                  value={loginInfos?.password}
                />
              </div>
              <p className="text-red text-xs">{loginError?.errors?.password}</p>
              <div className="flex justify-between items-center mt-8">
                <button
                  className={`bg-red md:text-base text-sm lg:w-1/3 py-3 lg:px-0 px-10 text-white disabled:bg-gray disabled:text-black`}
                  disabled={isSubmitDisabled}
                >
                  Login
                </button>

                <p className="text-red md:text-base text-sm">
                  Forget Password?
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default Login;
