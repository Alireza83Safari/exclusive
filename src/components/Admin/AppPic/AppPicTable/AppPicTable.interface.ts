export interface AppPicTableProps {
  appPics: any;
  isLoading: boolean;
  refetchAppPic: () => void;
  setEditAppPicId: (value: string) => void;
  setOpenEditModal: (value: boolean) => void;
}

export interface Column {
  id: "index" | "createAt" | "actions" | "url" | "title" | "type";
  label: string;
}

export const columns: readonly Column[] = [
  { id: "index", label: "index" },
  { id: "title", label: "Title" },
  { id: "type", label: "type" },
  { id: "url", label: "Url" },
  { id: "createAt", label: "createAt" },
  { id: "actions", label: "actions" },
];
