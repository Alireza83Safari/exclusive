export interface EditAppPicFileProps {
  openEditFileModal: boolean;
  setOpenEditFileModal: (value: boolean) => void;
  editAppPicId: string;
  refetchAppPic: () => void;
  setShowAppPicFile: (value: boolean) => void;
}
