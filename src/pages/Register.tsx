import React from "react";
import { Link } from "react-router-dom";

function Register() {
  return (
    <section className="max-w-[1170px] mx-auto relative lg:mt-10">
      <div className="grid md:grid-cols-2 grid-cols-1">
        <div className="1">
          <img src="/images/register.png" alt="" />
        </div>
        <div className="lg:px-16 md:px-8 px-3 lg:mt-8 mt-10">
          <form action="">
            <h1 className="text-4xl">Create an account</h1>
            <p className="my-5">Enter your details below</p>
            <div className="border-b border-borderColor py-5 mb-4">
              <input type="text" className="" placeholder="Name" />
            </div>
            <div className="border-b border-borderColor py-5 mb-4">
              <input
                type="text"
                className=""
                placeholder="Email or Phone Number"
              />
            </div>
            <div className="border-b border-borderColor py-5 mb-4">
              <input type="text" className="" placeholder="Password" />
            </div>
            <button className="bg-red w-full py-4 mt-8 text-white">
              View All Products
            </button>
            <div className="border border-borderColor w-full py-4 mt-3 flex items-center justify-center">
              <img src="/images/google.png" className="w-4 h-4" alt="" />
              <button>Sign up with Google</button>
            </div>

            <div className="flex justify-center mt-3">
              <p>Already have account?</p>
              <Link className="font-semibold" to="/login">
                Log in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Register;
