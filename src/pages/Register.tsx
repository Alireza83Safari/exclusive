import React, { Suspense, lazy, useState } from "react";
import { Link } from "react-router-dom";
import { userRegisterType } from "../types/Auth.type";
import { userRegisterHandler } from "../Redux/slices/auth";
import Spinner from "../components/Spinner/Spinner";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import HeaderSkelton from "../skelton/HeaderSkelton";
const Header = lazy(() => import("./Header"));
const Footer = lazy(() => import("../components/Footer"));

function Register() {
  const dispatch = useAppDispatch();
  const { registerError, loading } = useAppSelector((state) => state.auth);
  const [registerInfos, setRegisterInfos] = useState<userRegisterType>({
    password: "",
    passwordConfirmation: "",
    username: "",
  });

  const getInfoFromInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRegisterInfos({ ...registerInfos, [name]: value });
  };
  const isSubmitDisabled =
    registerInfos.username.length < 7 ||
    registerInfos.password.length < 7 ||
    registerInfos.passwordConfirmation.length < 7;

  const getRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(userRegisterHandler(registerInfos));
  };
  return (
    <>
      <Suspense fallback={<HeaderSkelton />}>
        <Header />
      </Suspense>

      <section className="max-w-[1170px] mx-auto relative lg:mt-10">
        {loading ? (
          <Spinner />
        ) : (
          <div className="grid md:grid-cols-2 grid-cols-1">
            <div className="1">
              <img src="/images/register.png" alt="" />
            </div>
            <div className="lg:px-16 md:px-8 px-3 lg:mt-8 mt-10">
              <form action="" onSubmit={getRegister}>
                <h1 className="text-4xl">Create an account</h1>
                <p className="my-5">Enter your details below</p>
                <div className="border-b border-borderColor py-5 mb-4">
                  <input
                    type="text"
                    name="username"
                    className="outline-none py-3"
                    placeholder="username"
                    onChange={getInfoFromInput}
                    value={registerInfos.username}
                  />
                </div>
                <p className="text-red text-xs">
                  {registerError?.errors?.username}
                </p>
                <div className="border-b border-borderColor py-5 mb-4">
                  <input
                    type="password"
                    name="password"
                    className="outline-none py-3"
                    placeholder="password"
                    onChange={getInfoFromInput}
                    value={registerInfos.password}
                  />
                </div>
                <p className="text-red text-xs"></p>
                <div className="border-b border-borderColor py-5 mb-4">
                  <input
                    type="password"
                    name="passwordConfirmation"
                    className="outline-none py-3"
                    placeholder="passwordConfirmation"
                    onChange={getInfoFromInput}
                    value={registerInfos.passwordConfirmation}
                  />
                </div>
                <p className="text-red text-xs">
                  {registerError?.errors?.password}
                </p>
                <button
                  className="bg-red w-full py-4 mt-8 text-white disabled:bg-gray disabled:text-black"
                  disabled={isSubmitDisabled}
                >
                  Register
                </button>

                <div className="flex justify-center mt-3">
                  <p>Already have account?</p>
                  <Link className="font-semibold" to="/login">
                    Log in
                  </Link>
                </div>
              </form>
            </div>
          </div>
        )}
      </section>

      <Suspense fallback={<Spinner />}>
        <Footer />
      </Suspense>
    </>
  );
}

export default Register;
