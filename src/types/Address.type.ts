export type addressStateType = {
  addressLoading: boolean;
  address: getAddressType;
  addressUserId: getAddressType[];
  addresses: getAddressType[];
};

export type addressType = {
  address: string;
  firstName: string;
  lastName: string;
  nationalCode: string;
  phoneNumber: string;
  plaque: number;
  postalCode: string;
};

export type getAddressType = {
  address: string;
  createdAt: string;
  firstName: string;
  id: string;
  lastName: string;
  nationalCode: string;
  phoneNumber: string;
  plaque: number;
  postalCode: string;
  updatedAt: string;
};
