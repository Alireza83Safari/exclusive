import React, { useContext, useEffect, useState } from "react";
import {
  RoleContext,
  roleContextType,
} from "../../../context/admin/roleContext";
import { Input } from "../../../components";
import toast from "react-hot-toast";
import reactDOM from "react-dom";
import { useCreateRoleMutation } from "../../../Redux/apis/admin/roleAdminApi";
import { roleErrorType } from "../../../types/error";

function AddRole() {
  const { showAddModal, setShowAddModal, refetchRoles, permissions } =
    useContext(RoleContext) as roleContextType;

  const permissionsName = permissions?.map((name: any) => name?.name || []);

  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [roleInfos, setRoleInfos] = useState({
    code: "",
    name: "",
  });

  const handleSelectAll = () => {
    const allPermissions = permissions?.flatMap((permission: any) =>
      permission.children.map((child: any) => child?.code)
    );

    if (selectedPermissions?.length === allPermissions?.length) {
      setSelectedPermissions([]);
    } else {
      setSelectedPermissions(allPermissions);
    }
  };
  const [createRole, { isSuccess, error }] = useCreateRoleMutation();
  const addRolesHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const newRole = {
      code: roleInfos?.code,
      isSystem: true,
      name: roleInfos?.name,
      permissions: selectedPermissions,
    };
    createRole(newRole);
  };

  useEffect(() => {
    if (isSuccess) {
      setShowAddModal(false);
      toast.success("create role is successfully");
      refetchRoles();
    }
  }, [isSuccess]);

  const setRoleValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoleInfos({
      ...roleInfos,
      [event.target.name]: event.target.value,
    });
  };
  //const [addRoleError, setAddRoleError] = useState<any>(null);

  const addRoleError = error as roleErrorType;
  return reactDOM.createPortal(
    <section
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-[#dddd] -translate-y-1/2 z-10 w-full h-screen flex items-center justify-center transition overflow-auto duration-400 ${
        showAddModal ? "visible" : "invisible"
      }`}
    >
      <div className="bg-white w-11/12 overflow-auto max-h-[94%] rounded-xl relative p-4">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex justify-between">
            <h1 className="text-xl mb-2 font-black">Add New Role</h1>
            <p className="text-red text-xs">{addRoleError?.data?.message}</p>
            <div className="mr-5">
              <button
                type="button"
                className="px-2 py-1 text-sm text-white rounded-md bg-black"
                onClick={handleSelectAll}
              >
                Select All
              </button>
            </div>
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-2 right-2"
            >
              <p className="text-red text-xl">X</p>
            </button>
          </div>
          <div className="grid grid-cols-2">
            <div className="py-1 m-1">
              <Input
                labelText="Role Name"
                placeholder="Permission name"
                name="name"
                value={roleInfos?.name}
                onChange={setRoleValue}
                className="border"
                Error={addRoleError?.data?.errors?.name}
              />
            </div>
            <div className="py-1 m-1">
              <Input
                labelText=" Permission code"
                placeholder="Permission code"
                name="code"
                className="border"
                value={roleInfos?.code}
                onChange={setRoleValue}
                Error={addRoleError?.data?.errors?.code}
              />
            </div>
          </div>

          <div className="mt-1 grid grid-cols-2">
            {permissionsName?.map((category: any, index: number) => (
              <div
                key={index}
                className="border border-borderColor rounded-lg m-1"
              >
                <p className="p-2">{category}</p>
                <ul className="text-xs grid grid-cols-2 gap-2 p-4">
                  {permissions.map(
                    (permission: any) =>
                      permission.name === category &&
                      permission.children.map(
                        (child: any, childIndex: number) => (
                          <li key={childIndex}>
                            <input
                              type="checkbox"
                              value={child.code}
                              checked={selectedPermissions.includes(child.code)}
                              onChange={() => {
                                if (selectedPermissions.includes(child.code)) {
                                  setSelectedPermissions(
                                    selectedPermissions.filter(
                                      (code) => code !== child.code
                                    )
                                  );
                                } else {
                                  setSelectedPermissions([
                                    ...selectedPermissions,
                                    child.code,
                                  ]);
                                }
                              }}
                              className="mr-1 h-3 w-3 border-gray-300 rounded"
                            />

                            <label
                              htmlFor={`category_${child.code}`}
                              className="text-gray-700 text-xs"
                            >
                              {child.name}
                            </label>
                          </li>
                        )
                      )
                  )}
                </ul>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="bg-black text-white w-full mt-5 py-2"
            onClick={addRolesHandler}
          >
            Add Role
          </button>
        </form>
      </div>
    </section>,
    document.getElementById("portal") as any
  );
}

export default AddRole;
