export interface EditRoleProps {
  refetchRoles: () => void;
  editRoleId: string;
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  permissions: any;
}
