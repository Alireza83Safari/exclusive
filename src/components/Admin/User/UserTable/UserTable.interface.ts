export interface Column {
  id:
    | "index"
    | "username"
    | "roleName"
    | "createAt"
    | "actions"
    | "email"
    | "mobile";
  label: string;
}

export const columns: readonly Column[] = [
  { id: "index", label: "index" },
  { id: "username", label: "username" },
  { id: "roleName", label: "role Name" },
  { id: "email", label: "email" },
  { id: "mobile", label: "mobile" },
  { id: "createAt", label: "createAt" },
  { id: "actions", label: "actions" },
];

export interface UserTableProps {
  users: any;
  isLoading: boolean;
  refetchUser: () => void;
}
