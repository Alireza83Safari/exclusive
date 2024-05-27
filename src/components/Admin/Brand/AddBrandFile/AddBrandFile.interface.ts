export interface AddBrandFileProps {
  refetchBrands: () => void;
  createdBrandId: string;
  setShowAddBrand: React.Dispatch<React.SetStateAction<boolean>>;
  setShowAddBrandFile: React.Dispatch<React.SetStateAction<boolean>>;
}
