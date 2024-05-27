export interface EditBrandProps {
  showEditModal: boolean;
  setShownEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  editBrandId: string;
  refetchBrands: () => void;
}
