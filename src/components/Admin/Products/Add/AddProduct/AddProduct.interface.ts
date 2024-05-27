export interface AddProductProps {
  showAddProductModal: boolean;
  setShowAddProductModal: (value: boolean) => void;
  refetchProducts: () => void;
}
