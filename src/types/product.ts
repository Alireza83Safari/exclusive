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
export interface product {
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

export interface userProductType extends product {
  discountQuantity: number;
  discountType: number;
  discountValue: number;
  fileUrl: string;
  id: string;
  itemId: string;
  price: number;
  quantity: number;
  rate: any;
  isUserFavorite: boolean;
}

type productsLoading = {
  productsLoading?: boolean;
};

export type userProductTypeWithLoading = userProductType & productsLoading;

export interface adminProductType extends product {
  brandFileUrl?: string;
  id: string;
}
