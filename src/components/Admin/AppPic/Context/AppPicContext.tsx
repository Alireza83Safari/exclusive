import { createContext, useState } from "react";
import { useGetAppPicsUserQuery } from "../../../../Redux/apis/user/appPicUserApi";
export type appPicContextProviderType = {
  children: React.ReactNode;
};
export type appPicContextType = {
  refetchAppPic: () => void;
  appPics: any;
  appPicLoading: boolean;
  openEditModal: boolean;
  setOpenEditModal: (value: boolean) => void;
  editAppPicId: string;
  setEditAppPicId: (value: string) => void;
};

export const AppPicContext = createContext<appPicContextType | null>(null);

export const AppPicContextProvider = ({
  children,
}: appPicContextProviderType) => {
  const {
    data: appPics,
    isLoading: appPicLoading,
    refetch: refetchAppPic,
  } = useGetAppPicsUserQuery("");
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editAppPicId, setEditAppPicId] = useState("");

  return (
    <AppPicContext.Provider
      value={{
        appPics,
        appPicLoading,
        refetchAppPic,
        openEditModal,
        setOpenEditModal,
        editAppPicId,
        setEditAppPicId,
      }}
    >
      {children}
    </AppPicContext.Provider>
  );
};
