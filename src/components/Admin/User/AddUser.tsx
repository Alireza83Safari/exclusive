import React, { useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { UserContext, UserContextType } from "./Context/UserContext";
import reactDOM from "react-dom";
import Input from "../../Input";
import SelectList from "../../SelectList";
import { user } from "../../../types/user";
import { role } from "../../../types/role";
import Spinner from "../../Spinner/Spinner";
import { useCreateUserMutation } from "../../../Redux/apis/admin/userAdminApi";
import { useGetRolesQuery } from "../../../Redux/apis/admin/roleAdminApi";
import { userErrorType } from "../../../types/error";

function AddUser() {
  const { showAddModal, refetchUser, setShowAddModal } = useContext(
    UserContext
  ) as UserContextType;

  const inintialUserState = {
    email: "",
    enabled: true,
    firstName: "",
    isSystem: true,
    lastName: "",
    mobile: "",
    roleId: "",
    username: "",
    roleName: "",
  };

  const [addUserValue, setAddUserValue] = useState<user>(inintialUserState);

  const setInputValue = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = event.target;
    setAddUserValue({ ...addUserValue, [name]: value });
  };

  const [createUser, { error, isSuccess, isLoading }] = useCreateUserMutation();

  const addUserHandler = () => {
    createUser(addUserValue);
  };

  const addUserError = error as userErrorType;

  const getDisbledBtn = useMemo(() => {
    const { username, roleId } = addUserValue;
    if (username.length < 3 || roleId.length < 3) {
      return true;
    } else {
      return false;
    }
  }, [addUserValue]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Create User Is Success");
      setShowAddModal(false);
      refetchUser();
    }
  }, [isSuccess]);

  const { data: roles } = useGetRolesQuery("");

  return reactDOM.createPortal(
    <section
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-[#dddd] -translate-y-1/2 z-10 w-full h-screen flex items-center justify-center transition overflow-auto duration-400 ${
        showAddModal ? "visible" : "invisible"
      }`}
    >
      <div className="bg-white p-2">
        <div>
          <p className="text-center text-xl">Add New User</p>
          <p className="text-red">{addUserError?.data?.message}</p>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          {isLoading ? (
            <Spinner />
          ) : (
            <div className="grid grid-cols-2 p-4 rounded-lg gap-x-4 gap-y-6">
              <div className="col-span-2">
                <Input
                  labelText="email"
                  placeholder="email"
                  name="email"
                  required
                  className="border"
                  value={addUserValue.email}
                  onChange={setInputValue}
                  Error={addUserError?.data?.errors?.email}
                />
              </div>

              <div className="col-span-2">
                <Input
                  labelText="username"
                  placeholder="username"
                  name="username"
                  className="border"
                  value={addUserValue.username}
                  onChange={setInputValue}
                  Error={addUserError?.data?.errors?.username}
                />
              </div>

              <div>
                <Input
                  labelText="firstName"
                  placeholder="firstName"
                  name="firstName"
                  className="border"
                  value={addUserValue.firstName}
                  onChange={setInputValue}
                  Error={addUserError?.data?.errors?.firstName}
                />
              </div>

              <div>
                <Input
                  labelText="lastName"
                  placeholder="lastName"
                  name="lastName"
                  className="border"
                  value={addUserValue.lastName}
                  onChange={setInputValue}
                  Error={addUserError?.data?.errors?.lastName}
                />
              </div>

              <div>
                <Input
                  type="number"
                  min={11}
                  max={11}
                  labelText="mobile"
                  placeholder="mobile"
                  name="mobile"
                  className="border"
                  value={addUserValue.mobile}
                  onChange={setInputValue}
                  Error={addUserError?.data?.errors?.mobile}
                />
              </div>

              <div>
                <label className="text-sm">Roles</label>
                <SelectList
                  onChange={(selected) =>
                    setAddUserValue({
                      ...addUserValue,
                      roleId: selected.value,
                      roleName: selected.label,
                    })
                  }
                  name="roleId"
                  options={roles?.data.map((role: role) => ({
                    label: role.name,
                    value: role.id,
                  }))}
                  defaultValue={{
                    label: String(addUserValue.roleName),
                    value: addUserValue.roleId,
                  }}
                />
              </div>

              <button
                onClick={addUserHandler}
                disabled={getDisbledBtn}
                className="bg-black py-2 text-white rounded-md disabled:bg-gray"
              >
                Add User
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="py-2 border rounded-md"
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>
    </section>,
    document.getElementById("portal") as any
  );
}

export default AddUser;
