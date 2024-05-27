export interface AddProductFeatureProps {
  createProductId: string;
  setShowAddFile: (value: boolean) => void;
  setShowAddFeature: (value: boolean) => void;
  setShowAddProductModal: (value: boolean) => void;
  setShowAddInfoModal: (value: boolean) => void;
  refetchProducts: () => void;
}
