export type discountStateType = {
  discountLoading: boolean;
  discount: getDiscountAdminType;
  adminDiscounts: getDiscountAdminType[];
  userDiscounts: getDiscountUserType[];
  discountCode: null;
  discountCodeError: null;
};

export type getDiscountAdminType = {
  code: string;
  createdAt: string;
  creatorUserId: string;
  creatorUsername: string;
  expiresIn: string;
  id: string;
  productItemId: string;
  productName: string;
  quantity: number;
  relatedUserId: string;
  relatedUserUsername: string;
  type: number;
  typeName: string;
  updatedAt: string;
  value: number;
};

export type getDiscountUserType = {
  code: string;
  createdAt: string;
  expiresIn: string;
  id: string;
  quantity: number;
  type: number;
  typeName: string;
  updatedAt: string;
  value: number;
};

export type discountUserType = {
  code: string;
  expiresIn: string;
  productItemId: null;
  quantity: number;
  relatedUserId: string;
  type: number;
  value: number;
};

export type discountProductType = {
  code: null;
  expiresIn: string;
  productItemId: string;
  quantity: number;
  relatedUserId: null;
  type: number;
  value: number;
};

export type editDiscountType = {
  discountInfo: discountUserType | discountProductType;
  discountId: string;
  type: string;
};
