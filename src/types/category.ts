export interface category {
  code: string;
  name: string;
}

export interface categoryAdminType extends category {
  createdAt: string;
  id: string;
  updatedAt: string;
}

export type categoryUserType = {
  key: string;
  value: string;
};
