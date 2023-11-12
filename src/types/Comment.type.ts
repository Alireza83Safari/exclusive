export type commentStateType = {
  commentLoading: boolean;
  comment: getCommentType;
  comments: getCommentType[];
  changeCommentStatus: changeCommentStatusType;
  productComments: getProductCommentsType[];
};

export type changeCommentStatusType = {
  note: string;
  status: number | null;
};

export interface commentType {
  productId: string;
  rate: number;
  strengthPoints?: string[];
  text: string;
  weakPonits?: string[];
}

export interface getCommentType extends commentType {
  adminNote: string;
  commentStatus: number;
  createdAt: string;
  id: string;
  productName: string;
  updatedAt: string;
  username: string;
}

export interface getProductCommentsType extends commentType {
  createdAt: string;
  id: string;
  updatedAt: string;
  username: string;
};
