export interface color {
  code: string;
  colorHex: string;
  name: string;
}

export interface getColorType extends color {
  createdAt: string;
  id: string;
  updatedAt: string;
}

export type colorSelectListType = {
  key: string;
  value: string;
};
