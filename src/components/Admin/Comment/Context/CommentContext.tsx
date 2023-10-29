import { createContext, useState } from "react";
import { useGetCommentsAdminQuery } from "../../../../Redux/apis/commentApi";
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
};

export const CommentContext = createContext<commentContextType | null>(null);

export const CommentContextProvider = ({
  children,
}: commentContextProviderType) => {
  const {
    data: comments,
    isLoading: commentsLoading,
    refetch: refetchComments,
  } = useGetCommentsAdminQuery("");

  const [openEditModal, setOpenEditModal] = useState(false);
  const [editCommentId, setDditCommentId] = useState("");

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
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};
