import { createContext, useState } from "react";
import { appPicUserApi } from "../../Redux"; 
export type appPicContextProviderType = {
  children: React.ReactNode;
};
export type appPicContextType = {
  refetchAppPic: () => void;
  appPics: any;
  appPicLoading: boolean;
  openEditModal: boolean;
  setOpenEditModal: (value: boolean) => void;
  openEditFileModal: boolean;
  setOpenEditFileModal: (value: boolean) => void;
  editAppPicId: string;
  setEditAppPicId: (value: string) => void;
  setCreateAppPicId: (value: string) => void;
  createAppPicId: string;
  showAppPicFile: boolean;
  setShowAppPicFile: (value: boolean) => void;
};

export const AppPicContext = createContext<appPicContextType | null>(null);

export const AppPicContextProvider = ({
  children,
}: appPicContextProviderType) => {
  const {
    data: appPics,
    isLoading: appPicLoading,
    refetch: refetchAppPic,
  } = appPicUserApi.useGetAppPicsUserQuery("");
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openEditFileModal, setOpenEditFileModal] = useState(false);
  const [editAppPicId, setEditAppPicId] = useState("");
  const [createAppPicId, setCreateAppPicId] = useState("");
  const [showAppPicFile, setShowAppPicFile] = useState(false);

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
        createAppPicId,
        setCreateAppPicId,
        showAppPicFile,
        setShowAppPicFile,
        openEditFileModal,
        setOpenEditFileModal,
      }}
    >
      {children}
    </AppPicContext.Provider>
  );
};
