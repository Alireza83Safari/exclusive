export type colorStateType = {
  colorLoading: false;
  color: getColorType;
  colors: getColorType[];
  colorsSelectList: colorSelectListType[];
};

export interface colorType {
  code: string;
  colorHex: string;
  name: string;
}

export interface getColorType extends colorType {
  createdAt: string;
  id: string;
  updatedAt: string;
}

export type colorSelectListType = {
  key: string;
  value: string;
};
