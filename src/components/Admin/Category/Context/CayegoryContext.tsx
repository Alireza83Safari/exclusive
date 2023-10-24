import { createContext, useState } from "react";
import { useGetCategoriesQuery } from "../../../../Redux/apis/categoryApi";
export type categoryContextProviderType = {
  children: React.ReactNode;
};
export type categoryContextType = {
  refetchCategory: () => void;
  category: any;
  categoryLoading: boolean;
  openEditModal: boolean;
  setOpenEditModal: (value: boolean) => void;
  editCategoryId: string;
  setEditCategoryId: (value: string) => void;
};

export const CategoryContext = createContext<categoryContextType | null>(null);

export const CategoryContextProvider = ({
  children,
}: categoryContextProviderType) => {
  const {
    data: category,
    isLoading: categoryLoading,
    refetch: refetchCategory,
  } = useGetCategoriesQuery("");
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState("");

  return (
    <CategoryContext.Provider
      value={{
        category,
        categoryLoading,
        refetchCategory,
        openEditModal,
        setOpenEditModal,
        editCategoryId,
        setEditCategoryId,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
