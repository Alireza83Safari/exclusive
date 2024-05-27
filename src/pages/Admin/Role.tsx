import { useState } from "react";
import { AddRole, EditRole, RoleTable } from "../../components";
import { roleAdminApi } from "../../Redux/apis/admin/roleAdminApi";

function Role() {
  const {
    data: roles,
    isLoading,
    refetch: refetchRoles,
  } = roleAdminApi.useGetRolesQuery("");

  const { data: permissions } = roleAdminApi.useGetRolePermissionsQuery("");

  const [showEditModal, setShowEditModal] = useState(false);
  const [editRoleId, setEditRoleId] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <>
      <div className="mt-3 md:mx-12">
        <button
          className="bg-black text-white h-9 text-sm px-3 rounded-md"
          onClick={() => setShowAddModal(true)}
        >
          Add New Role
        </button>
      </div>

      <RoleTable
        roles={roles}
        isLoading={isLoading}
        refetchRoles={refetchRoles}
        setShowEditModal={setShowEditModal}
        setEditRoleId={setEditRoleId}
      />

      {showEditModal && (
        <EditRole
          refetchRoles={refetchRoles}
          editRoleId={editRoleId}
          setShowEditModal={setShowEditModal}
          permissions={permissions}
        />
      )}

      {showAddModal && (
        <AddRole
          refetchRoles={refetchRoles}
          permissions={permissions}
          setShowAddModal={setShowAddModal}
        />
      )}
    </>
  );
}

export default Role;
