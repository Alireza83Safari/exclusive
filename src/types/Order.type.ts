export type orderStateType = {
  userOrders: orderUserType[];
  adminOrders: orderAdminType[];
  orderLoading: boolean;
};

export type addOrderItemType = {
  productItemId: string;
  quantity: number;
};

export type orderUserType = {
  discountQuantity: number;
  discountType: number;
  discountValue: number;
  fileUrl: string;
  id: string;
  price: number;
  productItemId: string;
  productName: string;
  quantity: number;
  totalPrice: number;
};

export type orderAdminType = {
  createdAt: string;
  discountPrice: number;
  discountType: number;
  discountValue: number;
  orderId: string;
  paidAt: string;
  price: number;
  status: number;
  totalPrice: number;
  updatedAt: string;
  userId: string;
  username: string;
};
