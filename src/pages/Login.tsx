import React from "react";

function Login() {
  return (
    <section className="max-w-[1170px] mx-auto relative lg:mt-10">
      <div className="grid md:grid-cols-2 grid-cols-1">
        <div className="">
          <img src="/images/register.png" alt="" />
        </div>
        <div className="lg:px-16 md:px-8 px-3 lg:mt-8 mt-10">
          <form action="">
            <h1 className="sm:text-4xl text-3xl">Log in to Exclusive</h1>
            <p className="my-5">Enter your details below</p>
            <div className="border-b border-borderColor py-5 mb-4">
              <input type="text" className="outline-none" placeholder="Name" />
            </div>
            <div className="border-b border-borderColor py-5 mb-4">
              <input
                type="text"
                className="outline-none"
                placeholder="Email or Phone Number"
              />
            </div>
            <div className="border-b border-borderColor py-5 mb-4">
              <input
                type="text"
                className="outline-none"
                placeholder="Password"
              />
            </div>
            <div className="flex justify-between items-center mt-8">
              <button className="bg-red md:text-base text-sm lg:w-1/3 py-3 lg:px-0 px-10 text-white">
                Login
              </button>
              <p className="text-red md:text-base text-sm">Forget Password?</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
