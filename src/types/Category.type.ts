export type categoryStateType = {
  category: categoryUserType[];
  adminCategory: categoryAdminType[];
  categoryError: string | null;
  categoryLoading: boolean;
};

export interface categoryType {
  code: string;
  name: string;
}

export interface categoryAdminType extends categoryType {
  createdAt: string;
  id: string;
  updatedAt: string;
}

export type categoryUserType = {
  key: string;
  value: string;
};
