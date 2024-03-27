export type changeCommentStatus = {
  note: string;
  status: number | null;
};

export interface comment {
  productId: string;
  rate: number;
  strengthPoints?: string[];
  text: string;
  weakPonits?: string[];
}

export interface getCommentType extends comment {
  adminNote: string;
  commentStatus: number;
  createdAt: string;
  id: string;
  productName: string;
  updatedAt: string;
  username: string;
}

export interface getProductCommentsType extends comment {
  createdAt: string;
  id: string;
  updatedAt: string;
  username: string;
}
