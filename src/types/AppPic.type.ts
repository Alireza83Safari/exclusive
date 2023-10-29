export type appPicStateType = {
  appPicLoading: boolean;
  appPic: getAppPicType;
  appPics: getAppPicType[];
};

export interface appPicType {
  appPicType: number | null;
  description: string;
  priority: number | null;
  title: string;
  url: string;
}

export interface getAppPicType extends appPicType {
  createdAt: string;
  fileId: string;
  fileName: string;
  fileType: number;
  fileUrl: string;
  id: string;
  updatedAt: string;
}
