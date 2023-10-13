export type productStateType = {
  productLoading: boolean;
  adminProduct: adminProductType | null;
  adminProducts: adminProductType[];
  adminProductSelectList: adminProductType[];
  userProduct: userProductType;
  userProducts: userProductType[];
  error: string | null;
  productsWithOrder:  userProductType;
};

export type productType = {
  brandId: string;
  categoryId: string;
  code: string;
  description: string;
  name: string;
  shortDescription: string;
  topFeatures: string[];
};

export type userProductType = {
  brandId: string;
  brandName: string;
  categoryId: string;
  categoryName: string;
  code: string;
  discountQuantity: number;
  discountType: number;
  discountValue: number;
  fileUrl: string;
  id: string;
  itemId: string;
  name: string;
  price: number;
  quantity: number;
};

export type adminProductType = {
  brandFileUrl?: string;
  brandId: string;
  brandName: string;
  categoryId: string;
  categoryName: string;
  code: string;
  id: string;
  name: string;
};
