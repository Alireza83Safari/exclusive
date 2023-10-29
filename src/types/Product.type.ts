export type productStateType = {
  productLoading: boolean;
  adminProduct: adminProductType | null;
  adminProducts: adminProductType[];
  adminProductSelectList: adminProductType[];
  userProduct: userProductType;
  userProducts: userProductType[];
  addProductError: errorType | null;
  productsWithOrder: userProductType;
  addProductResponse: number | null;
  createProductId: string | null;
  editProductResponse: number;
};

export type errorType = {
  message?: string;
  errors?: {
    name: string;
    code: string;
    description: string;
    brandId: string;
    categoryId: string;
    topFeatures: string;
    shortDescription: string;
  };
};
export interface productType {
  brandId: string;
  categoryId: string;
  code: string;
  description: string;
  name: string;
  shortDescription: string;
  topFeatures: string[];
  brandName?: string;
  categoryName?: string;
}

export interface userProductType extends productType {
  discountQuantity: number;
  discountType: number;
  discountValue: number;
  fileUrl: string;
  id: string;
  itemId: string;
  price: number;
  quantity: number;
}

type productsLoading = {
  productsLoading?: boolean;
};

export type userProductTypeWithLoading = userProductType & productsLoading;

export interface adminProductType extends productType {
  brandFileUrl?: string;
  id: string;
}
