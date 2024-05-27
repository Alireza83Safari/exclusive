export interface AddBrandProps {
  refetchBrands: () => void;
  setShowAddBrand: React.Dispatch<React.SetStateAction<boolean>>;
  setCreatedBrandId: React.Dispatch<React.SetStateAction<string>>;
  setShowAddBrandFile: React.Dispatch<React.SetStateAction<boolean>>;
}
