export interface ProductsTableProps {
  setShowAddProductModal: (value: boolean) => void;
  setShowProductInfoModal: (value: boolean) => void;
  setEditProductId: (value: string) => void;
  refetchProducts: () => void;
  products: any;
  isLoading: boolean;
  setProductInfo: (value: boolean) => void;
}
