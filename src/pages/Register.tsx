import React from "react";

function Register() {
  return (
    <section className="max-w-[1170px] mx-auto relative mt-10">
      <div className="grid grid-cols-2">
        <div className="1">
          <img src="/images/register.png" alt="" />
        </div>
        <div className="px-16 mt-8">
          <form action="">
            <h1 className="text-4xl">Create an account</h1>
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
            <button className="bg-red w-full py-4 mt-8 text-white">
              View All Products
            </button>
            <div className="border border-borderColor w-full py-4 mt-3 flex items-center justify-center">
              <img src="/images/google.png" className="w-4 h-4" alt="" />
              <button>Sign up with Google</button>
            </div>

            <div className="flex justify-center mt-3">
              <p>Already have account?</p>
              <p className="font-semibold">Log in</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Register;
