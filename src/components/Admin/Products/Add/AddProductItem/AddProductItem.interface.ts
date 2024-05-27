export interface AddProductItemProps {
  setShowAddItem: (value: boolean) => void;
  setShowAddFeature: (value: boolean) => void;
  createProductId: string;
  showAddItem: boolean;
  setShowAddProductModal: (value: boolean) => void;
  setShowAddInfoModal: (value: boolean) => void;
  refetchProducts: () => void;
}
