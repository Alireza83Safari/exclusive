export interface BrandTableProps {
  brands: any;
  isLoadingBrands: boolean;
  refetchBrands: () => void;
  setEditBrandId: React.Dispatch<React.SetStateAction<string>>;
  setShownEditModal: React.Dispatch<React.SetStateAction<boolean>>;
}
