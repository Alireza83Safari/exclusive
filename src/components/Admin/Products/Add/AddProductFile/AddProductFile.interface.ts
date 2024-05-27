export interface AddProductFileProps {
  setShowAddProductModal: (value: boolean) => void;
  createProductId: string;
  setShowAddFile: (value: boolean) => void;
  setShowAddInfoModal: (value: boolean) => void;
  refetchProducts: () => void;
}
