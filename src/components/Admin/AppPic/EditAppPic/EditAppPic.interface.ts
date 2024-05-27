export interface EditAppPicProps {
  openEditModal: boolean;
  setOpenEditModal: (value: boolean) => void;
  editAppPicId: string;
  refetchAppPic: () => void;
  setOpenEditFileModal: (value: boolean) => void;
}
