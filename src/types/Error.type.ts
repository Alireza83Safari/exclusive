export type productItemError = {
  message?: string;
  errors?: {
    colorId: string;
    price: string;
    productId: string;
    quantity: string;
    status: string;
  };
};

export type productError = {
  message?: string;
  errors?: {
    brandId: string;
    categoryId: string;
    code: string;
    description: string;
    name: string;
    shortDescription: string;
    topFeatures: string;
  };
};

export type addressErrorType = {
  message?: string;
  errors?: {
    address: string;
    firstName: string;
    lastName: string;
    nationalCode: string;
    phoneNumber: string;
    plaque: string;
    postalCode: string;
  };
};
