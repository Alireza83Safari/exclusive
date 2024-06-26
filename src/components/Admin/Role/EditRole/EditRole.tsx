import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import toast from "react-hot-toast";
import { Input } from "../../../../components";
import { roleErrorType } from "../../../../types/error";
import { role } from "../../../../types/role";
import { roleAdminApi } from "../../../../Redux";
import { EditRoleProps } from "./EditRole.interface";

export default function EditRole(props: EditRoleProps) {
  const { refetchRoles, editRoleId, setShowEditModal, permissions } = props;

  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [initiallySelectedPermissions, setInitiallySelectedPermissions] =
    useState([]);

  const permissionsName =
    permissions?.map((permission: any) => permission.name) || [];

  const [editRole, { error, isSuccess }] = roleAdminApi.useEditRoleMutation();
  const [getRole, { data: editRoleData, isSuccess: isSuccessGetRole }] =
    roleAdminApi.useGetRoleMutation();

  useEffect(() => {
    if (isSuccessGetRole) {
      setInitiallySelectedPermissions(editRoleData?.permissions || []);
    }
  }, [isSuccessGetRole]);

  ///// find edit role when user choose role
  useEffect(() => {
    getRole(editRoleId);
  }, [editRoleId]);

  useEffect(() => {
    setSelectedPermissions(initiallySelectedPermissions);
  }, [initiallySelectedPermissions]);

  /// for select all permissions
  const handleSelectAll = () => {
    const allPermissions = permissions.flatMap((permission: any) =>
      permission.children.map((child: any) => child.code)
    );

    if (selectedPermissions.length === allPermissions.length) {
      setSelectedPermissions([]);
    } else {
      setSelectedPermissions(allPermissions);
    }
  };

  ///// edit role fn
  const editRoleHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget); // Use currentTarget instead of target
    const data: Record<string, string> = {};

    formData.forEach((value, key) => {
      data[key] = value as string;
    });

    const newRole = {
      code: data.code,
      isSystem: true,
      name: data.name,
      permissions: selectedPermissions,
    } as role;
    editRole({ id: editRoleId, roleInfo: newRole });
  };

  ///// work when edit role is success
  useEffect(() => {
    if (isSuccess) {
      setShowEditModal(false);
      toast.success("edit role is successfully");
      refetchRoles();
    }
  }, [isSuccess]);

  const editRoleError = error as roleErrorType;

  return ReactDOM.createPortal(
    <section className="fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-[#dddd] -translate-y-1/2 z-10 w-full h-screen flex items-center justify-center transition overflow-auto duration-400">
      <div className="bg-white w-11/12 overflow-auto p-3 h-[95%] rounded-xl">
        <div className="flex justify-between mb-4">
          <div>
            <button
              type="button"
              className="px-2 py-1 text-sm text-white-100 text-white rounded-md bg-black"
              onClick={handleSelectAll}
            >
              Select All
            </button>
          </div>
          <button onClick={() => setShowEditModal(false)}>
            <p className="text-red text-xl">X</p>
          </button>
        </div>
        <form onSubmit={editRoleHandler}>
          <div className="grid grid-cols-2">
            <div className="py-1 mx-1">
              <Input
                labelText="Role Name"
                placeholder="Permission name"
                name="name"
                value={editRoleData?.name}
                className="border"
                Error={editRoleError?.data?.errors?.name}
              />
            </div>

            <div className="py-1 mx-1">
              <Input
                labelText="Role Code"
                name="code"
                placeholder="Role Code"
                value={editRoleData?.code}
                className="border"
                Error={editRoleError?.data?.errors?.code}
              />
            </div>
          </div>

          <div className="mt-1 grid grid-cols-2">
            {permissionsName.map((permi: any, index: number) => (
              <div key={index} className="border m-1 rounded-lg">
                <p className="p-2">{permi}</p>
                <ul className="text-xs grid grid-cols-2 gap-2 p-4">
                  {permissions.map(
                    (permission: any) =>
                      permission.name === permi &&
                      permission.children.map(
                        (child: any, childIndex: number) => (
                          <li key={childIndex}>
                            <input
                              type="checkbox"
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
            className="text-white bg-black mt-4 py-2 w-full"
          >
            Submit
          </button>
        </form>
      </div>
    </section>,
    document.getElementById("portal") as any
  );
}
