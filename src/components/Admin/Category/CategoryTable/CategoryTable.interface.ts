export interface CategoryTableProps {
  category: any;
  categoryLoading: boolean;
  refetchCategory: () => void;
  setOpenEditModal: (value: boolean) => void;
  setEditCategoryId: (value: string) => void;
}
