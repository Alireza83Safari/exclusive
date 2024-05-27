import React, { useState, useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { user } from "../../../../types/user";
import { Input, SelectList } from "../../../../components";
import reactDOM from "react-dom";
import { role } from "../../../../types/role";
import Spinner from "../../../Share/Spinner/Spinner";
import {
  useEditUserMutation,
  useGetUserMutation,
} from "../../../../Redux/apis/admin/userAdminApi";
import { useGetRolesQuery } from "../../../../Redux/apis/admin/roleAdminApi";
import { userErrorType } from "../../../../types/error";

interface EditUserProps {
  setShowEditModal: (value: boolean) => void;
  editUserId: string;
  refetchUser: () => void;
}

export default function EditUser(props: EditUserProps) {
  const { setShowEditModal, editUserId, refetchUser } = props;

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

  const [editUserValue, setEditUserValue] = useState<user>(inintialUserState);

  const setInputValue = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = event.target;
    setEditUserValue({ ...editUserValue, [name]: value });
  };

  const [editUser, { error, isSuccess, isLoading }] = useEditUserMutation();

  const [
    getUser,
    { data: user, isSuccess: isSuccessGetUser, isLoading: getUserLoading },
  ] = useGetUserMutation();

  const editUserHandler = () => {
    editUser({ id: editUserId, userInfo: editUserValue });
  };

  const editUserError = error as userErrorType;

  const getDisbledBtn = useMemo(() => {
    const { username, roleId } = editUserValue;
    if (username.length < 3 || roleId.length < 3) {
      return true;
    } else {
      return false;
    }
  }, [editUserValue]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Edit User Is Success");
      setShowEditModal(false);
      refetchUser();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (editUserId) {
      getUser(editUserId);
    }
  }, [editUserId]);

  useEffect(() => {
    setEditUserValue({ ...inintialUserState });
    if (isSuccessGetUser && user) {
      setEditUserValue({
        ...editUserValue,
        email: user.email,
        enabled: user.enabled,
        firstName: user.firstName,
        isSystem: user.isSystem,
        lastName: user.lastName,
        mobile: user.mobile,
        roleId: user.roleId,
        username: user.username,
        roleName: user.roleName,
      });
    }
  }, [isSuccessGetUser]);

  const { data: roles } = useGetRolesQuery("");
  return reactDOM.createPortal(
    <section className="fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-[#dddd] -translate-y-1/2 z-10 w-full h-screen flex items-center justify-center transition overflow-auto duration-400">
      <div className="bg-white p-2">
        <div>
          <p className="text-center text-xl">Edit User</p>
          <p className="text-red">{editUserError?.data?.message}</p>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          {getUserLoading || isLoading ? (
            <Spinner />
          ) : (
            <div className="grid grid-cols-2 p-4 rounded-lg gap-x-4 gap-y-6">
              <div className="col-span-2">
                <Input
                  labelText="email"
                  placeholder="email"
                  name="email"
                  className="border"
                  value={editUserValue.email}
                  onChange={setInputValue}
                  Error={editUserError?.data?.errors?.email}
                />
              </div>

              <div>
                <Input
                  labelText="username"
                  placeholder="username"
                  name="username"
                  className="border"
                  value={editUserValue.username}
                  onChange={setInputValue}
                  Error={editUserError?.data?.errors?.username}
                />
              </div>

              <div>
                <Input
                  labelText="firstName"
                  placeholder="firstName"
                  name="firstName"
                  className="border"
                  value={editUserValue.firstName}
                  onChange={setInputValue}
                  Error={editUserError?.data?.errors?.firstName}
                />
              </div>

              <div>
                <Input
                  labelText="lastName"
                  placeholder="lastName"
                  name="lastName"
                  className="border"
                  value={editUserValue.lastName}
                  onChange={setInputValue}
                  Error={editUserError?.data?.errors?.lastName}
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
                  value={editUserValue.mobile}
                  onChange={setInputValue}
                  Error={editUserError?.data?.errors?.mobile}
                />
              </div>

              <div>
                <Input
                  labelText="lastName"
                  placeholder="lastName"
                  name="lastName"
                  className="border"
                  value={editUserValue.lastName}
                  onChange={setInputValue}
                  Error={editUserError?.data?.errors?.lastName}
                />
              </div>

              <div>
                <label className="text-sm">Roles</label>
                <SelectList
                  onChange={(selected) =>
                    setEditUserValue({
                      ...editUserValue,
                      roleId: selected.value,
                      roleName: selected.label,
                    })
                  }
                  name="roleId"
                  options={roles?.data?.map((role: role) => ({
                    label: role.name,
                    value: role.id,
                  }))}
                  defaultValue={{
                    label: String(editUserValue.roleName),
                    value: editUserValue.roleId,
                  }}
                />
              </div>

              <button
                onClick={editUserHandler}
                disabled={getDisbledBtn}
                className="bg-black py-2 text-white rounded-md disabled:bg-gray"
              >
                Edit User
              </button>
              <button
                onClick={() => setShowEditModal(false)}
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
