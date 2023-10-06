import React from "react";

function Account() {
  return (
    <section className="max-w-[1170px] mx-auto mt-20 relative">
      <div className="grid grid-cols-5">
        <ul className="col-span-1">
          <li className="mb-7">
            <p className="font-semibold">Manage My Account</p>
            <ul className="ml-5 mt-3 ">
              <li className="my-1">My Profile</li>
              <li className="my-1">Address Book</li>
              <li className="my-1">My Payment Options</li>
            </ul>
          </li>

          <li>
            <p className="font-semibold">My Orders</p>
            <ul className="ml-5 mt-3 ">
              <li className="my-1">My Returns</li>
              <li className="my-1">My Cancellations</li>
            </ul>
          </li>
        </ul>
        <div className="col-span-4">
          <form className="grid grid-cols-2 shadow-xl px-10 py-8 relative">
            <h3 className="text-red col-span-2 text-lg mb-2">
              Edit Your Profile
            </h3>
            <div className="mr-6 my-4">
              <label htmlFor="">First Name</label>
              <input
                type="text"
                placeholder="Md"
                className="w-full bg-gray px-3 py-3"
              />
            </div>
            <div className="ml-6 my-4">
              <label htmlFor="">First Name</label>
              <input
                type="text"
                placeholder="Md"
                className="w-full bg-gray px-3 py-3"
              />
            </div>

            <div className="mr-6 my-4">
              <label htmlFor="">First Name</label>
              <input
                type="text"
                placeholder="Md"
                className="w-full bg-gray px-3 py-3"
              />
            </div>
            <div className="ml-6 my-4">
              <label htmlFor="">First Name</label>
              <input
                type="text"
                placeholder="Md"
                className="w-full bg-gray px-3 py-3"
              />
            </div>

            <div className="my-2 col-span-2">
              <label htmlFor="">First Name</label>
              <input
                type="text"
                placeholder="Md"
                className="w-full bg-gray px-3 py-3"
              />
            </div>

            <div className="my-2 col-span-2">
              <label htmlFor="">First Name</label>
              <input
                type="text"
                placeholder="Md"
                className="w-full bg-gray px-3 py-3"
              />
            </div>

            <div className="my-2 col-span-2">
              <label htmlFor="">First Name</label>
              <input
                type="text"
                placeholder="Md"
                className="w-full bg-gray px-3 py-3"
              />
            </div>
            <div className="flex justify-end col-span-2 mt-5">
              <button className="mr-8">Cancel</button>
              <button className="py-3 px-8 bg-red text-white">
                Saves Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Account;
