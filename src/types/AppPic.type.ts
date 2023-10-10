export type appPicStateType = {
  appPicLoading: boolean;
  appPic: getAppPicType;
  appPics: getAppPicType[];
};

export type getAppPicType = {
  appPicType: number;
  createdAt: string;
  description: string;
  fileId: string;
  fileName: string;
  fileType: number;
  fileUrl: string;
  id: string;
  priority: number;
  title: string;
  updatedAt: string;
  url: string;
};

export type appPicType = {
  appPicType: number;
  description: string;
  priority: number;
  title: string;
  url: string;
};
