import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileUserInfo } from "../../Redux/Store/profile";
import { rootState } from "../../Redux/Store";

function AccountUserInfo() {
  const { profilesUserInfo } = useSelector((state: rootState) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileUserInfo() as any);
  }, []);

  return (
    <div className="md:col-span-5 col-span-7">
      <form className="grid grid-cols-2 shadow-xl md:px-10 px-4 py-8 relative">
        <h3 className="text-red col-span-2 text-lg mb-2">Edit Your Profile</h3>
        <div className="md:mr-6 mr-2 my-4">
          <label htmlFor="">First Name</label>
          <input
            type="text"
            placeholder="Md"
            className="w-full bg-gray px-3 py-3"
          />
        </div>
        <div className="md:ml-6 ml-2 my-4">
          <label htmlFor="">Last Name</label>
          <input
            type="text"
            placeholder="Md"
            name="lastName"
            className="w-full bg-gray px-3 py-3"
          />
        </div>

        <div className="md:mr-6 mr-2 my-4">
          <label htmlFor="">mobile</label>
          <input
            type="number"
            name="mobile"
            placeholder="Md"
            className="w-full bg-gray px-3 py-3"
          />
        </div>

        <div className="md:ml-6 mr-2 my-4">
          <label htmlFor="">roleName</label>
          <input
            type="text"
            placeholder="roleName"
            name="roleName"
            className="w-full bg-gray px-3 py-3"
          />
        </div>

        <div className="my-2 col-span-2">
          <label htmlFor="">username</label>
          <input
            type="text"
            placeholder="username"
            name="username"
            className="w-full bg-gray px-3 py-3"
          />
        </div>

        <div className="my-2 col-span-2">
          <label htmlFor="">email</label>
          <input
            type="email"
            placeholder="email"
            name="email"
            className="w-full bg-gray px-3 py-3"
          />
        </div>

        <div className="flex justify-end col-span-2 mt-5">
          <button className="mr-8">Cancel</button>
          <button className="py-3 sm:px-8 px-3 bg-red text-white">
            Saves Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default AccountUserInfo;
