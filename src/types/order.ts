export type addOrderItem = {
  productItemId: string;
  quantity: number;
};

export interface orderType {
  discountType: number;
  discountValue: number;
  price: number;
  totalPrice: number;
}

export interface orderUserType extends orderType {
  discountQuantity: number;
  fileUrl: string;
  id: string;
  productItemId: string;
  productName: string;
  quantity: number;
}

export interface orderAdminType extends orderType {
  createdAt: string;
  discountPrice: number;
  orderId: string;
  paidAt: string;
  status: number;
  updatedAt: string;
  userId: string;
  username: string;
}
