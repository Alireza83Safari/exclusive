export type profileStateType = {
  profileLoading: boolean;
  profileOrders: profileOrdersType[];
  profileFavorite: profileFavoriteType[];
  profileOrdersAdmin: profileOrdersType[];
  profileFavoriteAdmin: profileFavoriteType[];
  profilesUserInfo: profileUserInfo[];
};

export type profileFavoriteType = {
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

export type profileOrdersType = {
  code: string;
  createdAt: string;
  discountPrice: number;
  discountType: number;
  discountValue: number;
  fileUrls: string[];
  id: string;
  paidAt: string;
  price: number;
  status: number;
  totalPrice: number;
};

export type profileUserInfo = {
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  mobile: string;
  roleName: string;
  username: string;
};
