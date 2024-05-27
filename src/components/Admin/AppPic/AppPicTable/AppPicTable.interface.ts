export interface AppPicTableProps {
  appPics: any;
  isLoading: boolean;
  refetchAppPic: () => void;
  setEditAppPicId: (value: string) => void;
  setOpenEditModal: (value: boolean) => void;
}
