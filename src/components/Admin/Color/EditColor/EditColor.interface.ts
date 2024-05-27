export interface EditColorProps {
  openEditModal: boolean;
  setOpenEditModal: (value: boolean) => void;
  editColorId: string;
  refetchColor: () => void;
}
