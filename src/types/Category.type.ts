export type categoryStateType = {
  category: categoryUserType[];
  adminCategory: categoryAdminType[];
  categoryError: string | null;
  categoryLoading: boolean;
};

export type categoryAdminType = {
  code: string;
  name: string;
};

export type categoryUserType = {
  key: string;
  value: string;
};

export type editCategoryType = {
  categoryData: categoryAdminType;
  id: string;
};
