import { createContext, useState } from "react";
import {
  useGetRolePermissionsQuery,
  useGetRolesQuery,
} from "../../../../Redux/apis/roleApi";
export type roleContextProviderType = {
  children: React.ReactNode;
};

export type roleContextType = {
  refetchRoles: () => void;
  roles: any;
  rolesLoading: boolean;
  showEditModal: boolean;
  setShowEditModal: (value: boolean) => void;
  editRoleId: string;
  setEditRoleId: (value: string) => void;
  showAddModal: boolean;
  setShowAddModal: (value: boolean) => void;
  showAddModalFile: boolean;
  setShowAddModalFile: (value: boolean) => void;
  roleId: string;
  setRoleId: (value: string) => void;
  showPermissions: boolean;
  setShowPermissions: (value: boolean) => void;
  permissions: any
};

export const RoleContext = createContext<roleContextType | null>(null);

export const RoleContextProvider = ({ children }: roleContextProviderType) => {
  const {
    data: roles,
    isLoading: rolesLoading,
    refetch: refetchRoles,
  } = useGetRolesQuery("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editRoleId, setEditRoleId] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddModalFile, setShowAddModalFile] = useState(false);
  const [roleId, setRoleId] = useState("");
  const [showPermissions, setShowPermissions] = useState(false);
  const { data: permissions } = useGetRolePermissionsQuery("");

  return (
    <RoleContext.Provider
      value={{
        roles,
        rolesLoading,
        refetchRoles,
        showEditModal,
        setShowEditModal,
        editRoleId,
        setEditRoleId,
        showAddModal,
        setShowAddModal,
        showAddModalFile,
        setShowAddModalFile,
        roleId,
        setRoleId,
        showPermissions,
        setShowPermissions,
        permissions,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};
