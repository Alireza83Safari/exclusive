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
  status: number;
  data: {
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
};

export type appPicErrorType = {
  status: number;
  data: {
    message?: string;
    errors?: {
      appPicType: number;
      description: string;
      priority: string;
      title: string;
      url: string;
    };
  };
};

export interface brandErrorType {
  status: number;
  data: {
    message?: string;
    errors?: {
      code: string;
      name: string;
    };
  };
}

export interface categoryErrorType extends brandErrorType {}
export interface colorErrorType {
  status: number;
  data: {
    message?: string;
    errors?: {
      code: string;
      colorHex: string;
      name: string;
    };
  };
}

export interface commentErrorType {
  status: number;
  data: {
    message?: string;
    errors?: {
      productId: string;
      rate: number;
      strengthPoints: string[];
      text: string;
      weakPonits: string[];
    };
  };
}

export interface productErrorType {
  status: number;
  data: {
    message?: string;
    errors?: {
      brandId: string;
      categoryId: string;
      code: string;
      description: string;
      name: string;
      shortDescription: string;
      topFeatures: [""];
      brandName: string;
      categoryName: string;
    };
  };
}

export interface productItemErrorType {
  status: number;
  data: {
    message?: string;
    errors?: {
      colorId: string;
      price: string;
      productId: string;
      quantity: string;
      status: string;
    };
  };
}

export interface roleErrorType {
  status: number;
  data: {
    message?: string;
    errors?: {
      code: string;
      name: string;
    };
  };
}

export interface registerErrorType {
  status: number;
  data: {
    message?: string;
    errors?: {
      password: string;
      passwordConfirmation: string;
      username: string;
    };
  };
}

export interface loginErrorType {
  status: number;
  data: {
    message?: string;
    errors?: {
      password: string;
      username: string;
    };
  };
}

export interface userErrorType {
  status: number;
  data: {
    message?: string;
    errors?: {
      email: string;
      enabled: boolean;
      firstName: string;
      isSystem: boolean;
      lastName: string;
      mobile: string;
      roleId: string;
      username: string;
      roleName: string;
    };
  };
}

