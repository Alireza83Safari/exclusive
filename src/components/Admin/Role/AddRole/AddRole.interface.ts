export interface AddRoleProps {
  refetchRoles: () => void;
  permissions: any;
  setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>;
}
