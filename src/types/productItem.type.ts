export interface productItemType {
  colorId: string;
  isMainItem: boolean;
  price: number | null;
  productId: string;
  quantity: number | null;
  status: number | null;
  productName?: string;
  colorName: string;
}

export type productItemStateType = {
  productItem: productItemItemIdType;
  productItemProduct: productItemProductType[] | null;
  productItemSelectList: productItemSelectList[];
  adminProductItem: productItemProductType[];
  addProductItem: productItemType;
  productItemLoading: boolean;
  addProductItemError: addProductItemErrorType;
  addProductItemResponse: number;
};
export interface productItemProductType extends productItemType {
  color: string;
  id: string;
  productCode: string;
  productTitle: string;
}
export interface productItemSelectList extends productItemType {
  color: string;
  id: string;
}

export type addProductItemErrorType = {
  message?: string;
  errors?: {
    productId: string;
    colorId: string;
    isMainItem: string;
    price: string;
    quantity: string;
    status: string;
  };
};

export type productItemItemIdType = {
  color: string;
  colorId: string;
  colors: [
    {
      colorHex: string;
      name: string;
      productItemId: string;
    }
  ];
  discountQuantity: number;
  discountType: number;
  discountValue: number;
  features: [
    {
      category: string;
      items: [
        {
          key: string;
          value: string;
        }
      ];
    }
  ];
  files: [
    {
      fileType: number;
      fileUrl: string;
      id: string;
      originalName: string;
      uniqueFineName: string;
    }
  ];
  id: string;
  price: number;
  productCode: string;
  productDescription: string;
  productId: string;
  productShortDescription: string;
  productTitle: string;
  quantity: number;
  status: number;
};
