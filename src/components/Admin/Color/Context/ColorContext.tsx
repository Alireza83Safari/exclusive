import { createContext, useState } from "react";
import { useGetColorsQuery } from "../../../../Redux/apis/colorApi";
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
};

export const ColorContext = createContext<colorContextType | null>(null);

export const ColorContextProvider = ({
  children,
}: colorContextProviderType) => {
  const {
    data: colors,
    isLoading: colorsLoading,
    refetch: refetchColor,
  } = useGetColorsQuery("");
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editColorId, setEditColorId] = useState("");

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
      }}
    >
      {children}
    </ColorContext.Provider>
  );
};
