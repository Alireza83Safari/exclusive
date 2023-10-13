export type addressStateType = {
  addressLoading: boolean;
  address: getAddressType;
  addressUserId: getAddressType[];
  addresses: getAddressType[];
  addressError: errorAddressType;
};

export interface addressType {
  address: string;
  firstName: string;
  lastName: string;
  nationalCode: string;
  phoneNumber: string;
  plaque: number | null;
  postalCode: string;
}
export interface errorAddressType extends Partial<addressType> {}

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
