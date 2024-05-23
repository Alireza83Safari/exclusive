import { createContext, useState } from "react";
import { useFetchDataFromUrl } from "../../hooks/useFetchDataFromUrl";
import { adminAxios } from "../../services/adminInterceptor";
import { useGetCommentsUserQuery } from "../../Redux/apis/user/commentUserApi";
export type commentContextProviderType = {
  children: React.ReactNode;
};
export type commentContextType = {
  refetchComments: () => void;
  comments: any;
  commentsLoading: boolean;
  openEditModal: boolean;
  setOpenEditModal: (value: boolean) => void;
  editCommentId: string;
  setDditCommentId: (value: string) => void;
  total: number;
  commentsTotal: any;
};

export const CommentContext = createContext<commentContextType | null>(null);

export const CommentContextProvider = ({
  children,
}: commentContextProviderType) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editCommentId, setDditCommentId] = useState("");

  const {
    datas: comments,
    total,
    loading: commentsLoading,
    fetchDataFormUrl: refetchComments,
  } = useFetchDataFromUrl("comment", adminAxios);

  const { data: commentsTotal } = useGetCommentsUserQuery("");

  return (
    <CommentContext.Provider
      value={{
        comments,
        commentsLoading,
        refetchComments,
        openEditModal,
        setOpenEditModal,
        editCommentId,
        setDditCommentId,
        total,
        commentsTotal,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};
