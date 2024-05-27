export interface Column {
  id: "index" | "code" | "name" | "createAt" | "actions" | "permissions";
  label: string;
}

export const columns: readonly Column[] = [
  { id: "index", label: "Index" },
  { id: "name", label: "Name" },
  { id: "code", label: "Code" },
  { id: "permissions", label: "permissions" },
  { id: "createAt", label: "CreateAt" },
  { id: "actions", label: "Actions" },
];

export interface RoleTableProps {
  roles: any;
  isLoading: boolean;
  refetchRoles: () => void;
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  setEditRoleId: React.Dispatch<React.SetStateAction<string>>;
}
