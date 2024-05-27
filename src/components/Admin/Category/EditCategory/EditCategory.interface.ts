export interface EditCategoryProps {
  openEditModal: boolean;
  setOpenEditModal: (value: boolean) => void;
  editCategoryId: string;
  refetchCategory: () => void;
}
