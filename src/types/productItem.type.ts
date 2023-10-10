export type productItemStateType = {
  productItem: null;
  productItemSelectList: productItemSelectList[];
  adminProductItem: adminProductItemType[];
  addProductItem: adminProductItemType;
  productItemLoading: boolean;
};

export type adminProductItemType = {
  brandFileUrl: string;
  brandId: string;
  brandName: string;
  categoryId: string;
  categoryName: string;
  code: string;
  id: string;
  name: string;
};
export type productItemSelectList = {
  color: string;
  colorId: string;
  id: string;
  price: number;
};
export type productItemType = {
  colorId: string;
  isMainItem: boolean;
  price: number;
  productId: string;
  quantity: number;
  status: number;
};
