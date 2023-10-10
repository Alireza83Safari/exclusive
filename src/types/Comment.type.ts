export type commentStateType = {
  commentLoading: boolean;
  comment: getCommentType;
  comments: getCommentType[];
  changeCommentStatus: changeCommentStatusType;
  productComments: getProductCommentsType[];
};

export type changeCommentStatusType = {
  note: string;
  status: number;
};

export type getCommentType = {
  adminNote: string;
  commentStatus: number;
  createdAt: string;
  id: string;
  productId: string;
  productName: string;
  rate: number;
  strengthPoints: string[];
  text: string;
  updatedAt: string;
  username: string;
  weakPonits: string[];
};

export type commentType = {
  productId: string;
  rate: number;
  strengthPoints: string[];
  text: string;
  weakPonits: string[];
};

export type getProductCommentsType = {
  createdAt: string;
  id: string;
  rate: number;
  strengthPoints: string[];
  text: string;
  updatedAt: string;
  username: string;
  weakPonits: string[];
};
