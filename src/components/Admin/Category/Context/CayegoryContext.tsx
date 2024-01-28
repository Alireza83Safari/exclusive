import { createContext, useState } from "react";
import { useFetchDataFromUrl } from "../../../../hooks/useFetchDataFromUrl";
import { adminAxios } from "../../../../services/adminInterceptor";
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
  total: number;
};

export const CategoryContext = createContext<categoryContextType | null>(null);

export const CategoryContextProvider = ({
  children,
}: categoryContextProviderType) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState("");
  const {
    datas: category,
    total,
    loading: categoryLoading,
    fetchDataFormUrl: refetchCategory,
  } = useFetchDataFromUrl("category", adminAxios);

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
        total,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
