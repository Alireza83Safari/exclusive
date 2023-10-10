export type brandStateType = {
  brandLoading: boolean;
  brand: getBrandType;
  brands: brandType[];
  brandsUser: getBrandType[];
  brandsSelectList: brandSelectListType[];
};

export type getBrandType = {
  code: string;
  createdAt: string;
  fileId: string;
  fileName: string;
  fileType: number;
  fileUrl: string;
  id: string;
  name: string;
  updatedAt: string;
};

export type brandType = {
  code: string;
  name: string;
};

export type brandSelectListType = {
  key: string;
  value: string;
};
