export type colorStateType = {
  colorLoading: false;
  color: getColorType;
  colors: getColorType[];
  colorsSelectList: colorSelectListType[];
};

export type getColorType = {
  code: string;
  colorHex: string;
  createdAt: string;
  id: string;
  name: string;
  updatedAt: string;
};

export type colorType = {
  code: string;
  colorHex: string;
  name: string;
};

export type colorSelectListType = {
  key: string;
  value: string;
};
