export interface productItem {
  colorId: string;
  isMainItem: boolean;
  price: number | null;
  productId: string;
  quantity: number | null;
  status: number | null;
  productName?: string;
  colorName: string;
}

export interface productItemProduct extends productItem {
  color: string;
  id: string;
  productCode: string;
  productTitle: string;
}
export interface productItemSelectList extends productItem {
  color: string;
  id: string;
}
