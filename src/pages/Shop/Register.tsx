import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { userRegisterType } from "../../types/auth";
import { registerErrorType } from "../../types/error";
import { registerSchema } from "../../validations/auth";
import toast from "react-hot-toast";
import { Spinner } from "../../components";
import { authUserApi } from "../../Redux";
import { appRoutes } from "../../routes/appRoutes";
import { ShopLayout } from "../../layout";

function Register() {
  const initialStata = {
    password: "",
    passwordConfirmation: "",
    username: "",
  };
  const [registerInfos, setRegisterInfos] =
    React.useState<userRegisterType>(initialStata);
  const navigate = useNavigate();
  const [errors, setErrors] = React.useState<userRegisterType>();

  const getInfoFromInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRegisterInfos({ ...registerInfos, [name]: value });
  };

  const [userRegister, { error, isLoading, isSuccess }] =
    authUserApi.useUserRegisterMutation();

  const getFormIsValid = async () => {
    try {
      const isValid = await registerSchema.validate(registerInfos, {
        abortEarly: false,
      });

      if (isValid) {
        userRegister(registerInfos);
      }
    } catch (error) {
      let errors = (error as any)?.inner?.reduce(
        (acc: any, error: any) => ({
          ...acc,
          [error.path]: error.message,
        }),
        {}
      );
      setErrors(errors);
    }
  };
  React.useEffect(() => {
    if (isSuccess) {
      toast.success("user register successfully");
      navigate("/login");
    }
  }, [isSuccess]);

  const registerError = error as registerErrorType;

  if (isLoading) {
    <div className="min-h-[20rem]">
      <Spinner />
    </div>;
  }
  return (
    <ShopLayout>
      <div className="grid md:grid-cols-2 grid-cols-1">
        <div>
          <img src="/images/register.png" alt="" />
        </div>

        <div className="lg:px-16 md:px-8 px-3 lg:mt-8 mt-10">
          <form action="" onSubmit={(e) => e.preventDefault()}>
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
                onFocus={() => setErrors(initialStata)}
              />
            </div>
            <p className="text-red text-xs">
              {errors?.username || registerError?.data?.errors?.username}
            </p>
            <div className="border-b border-borderColor py-5 mb-4">
              <input
                type="password"
                name="password"
                className="outline-none py-3"
                placeholder="password"
                onChange={getInfoFromInput}
                value={registerInfos.password}
                onFocus={() => setErrors(initialStata)}
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
                onFocus={() => setErrors(initialStata)}
              />
            </div>
            <p className="text-red text-xs">
              {errors?.passwordConfirmation ||
                registerError?.data?.errors?.password}
            </p>
            <button
              className="bg-red w-full py-4 mt-8 text-white disabled:bg-gray disabled:text-black outline-none"
              onClick={getFormIsValid}
            >
              Register
            </button>

            <div className="flex justify-center mt-3">
              <p>Already have account?</p>
              <Link className="font-semibold" to={appRoutes.LOGIN}>
                Log in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </ShopLayout>
  );
}

export default Register;
