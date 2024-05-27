export interface AddProductInfoProps {
  setShowAddInfoModal: (value: boolean) => void;
  setShowAddItem: (value: boolean) => void;
  setCreateProductId: (value: string) => void;
  setShowAddProductModal: (value: boolean) => void;
  createProductId: string;
  refetchProducts: () => void;
}
