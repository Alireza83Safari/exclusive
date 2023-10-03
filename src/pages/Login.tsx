import React from "react";

function Login() {
  return (
    <section className="max-w-[1170px] mx-auto relative mt-10">
      <div className="grid grid-cols-2">
        <div className="1">
          <img src="/images/register.png" alt="" />
        </div>
        <div className="px-16 mt-8">
          <form action="">
            <h1 className="text-4xl">Log in to Exclusive</h1>
            <p className="my-5">Enter your details below</p>
            <div className="border-b py-5 mb-4">
              <input type="text" className="" placeholder="Name" />
            </div>
            <div className="border-b py-5 mb-4">
              <input
                type="text"
                className=""
                placeholder="Email or Phone Number"
              />
            </div>
            <div className="border-b py-5 mb-4">
              <input type="text" className="" placeholder="Password" />
            </div>
            <div className="flex justify-between items-center mt-8">
              <button className="bg-red w-1/3 py-3 text-white">
                View All Products
              </button>
              <p className="text-red">Forget Password?</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
