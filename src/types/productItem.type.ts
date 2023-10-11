export type productItemStateType = {
  productItem: productItemItemIdType;
  productItemProduct: productItemProductType[];
  productItemSelectList: productItemSelectList[];
  adminProductItem: productItemProductType[];
  addProductItem: productItemType;
  productItemLoading: boolean;
};

export type productItemProductType = {
  color: string;
  colorId: string;
  id: string;
  price: number;
  productCode: string;
  productTitle: string;
  quantity: number;
  productId: string;
  status: number;
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
