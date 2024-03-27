export interface appPic {
  appPicType: number | null;
  description: string;
  priority: number | null;
  title: string;
  url: string;
}

export interface getAppPicType extends appPic {
  createdAt: string;
  fileId: string;
  fileName: string;
  fileType: number;
  fileUrl: string;
  id: string;
  updatedAt: string;
}
