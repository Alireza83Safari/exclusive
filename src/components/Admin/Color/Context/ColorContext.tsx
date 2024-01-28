import { createContext, useState } from "react";
import { useFetchDataFromUrl } from "../../../../hooks/useFetchDataFromUrl";
import { adminAxios } from "../../../../services/adminInterceptor";
export type colorContextProviderType = {
  children: React.ReactNode;
};
export type colorContextType = {
  refetchColor: () => void;
  colors: any;
  colorsLoading: boolean;
  openEditModal: boolean;
  setOpenEditModal: (value: boolean) => void;
  editColorId: string;
  setEditColorId: (value: string) => void;
  total: number;
};

export const ColorContext = createContext<colorContextType | null>(null);

export const ColorContextProvider = ({
  children,
}: colorContextProviderType) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editColorId, setEditColorId] = useState("");

  const {
    datas: colors,
    total,
    loading: colorsLoading,
    fetchDataFormUrl: refetchColor,
  } = useFetchDataFromUrl("color", adminAxios);

  return (
    <ColorContext.Provider
      value={{
        colors,
        colorsLoading,
        refetchColor,
        openEditModal,
        setOpenEditModal,
        editColorId,
        setEditColorId,
        total,
      }}
    >
      {children}
    </ColorContext.Provider>
  );
};
