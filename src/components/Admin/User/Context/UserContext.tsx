import { createContext, useState } from "react";
import { useFetchDataFromUrl } from "../../../../hooks/useFetchDataFromUrl";
import { adminAxios } from "../../../../services/adminInterceptor";

type UserContextProviderType = { children: React.ReactNode };

export type UserContextType = {
  showAddModal: boolean;
  showEditModal: boolean;
  showDeleteModal: boolean;
  editUserId: string;
  setShowAddModal: (value: boolean) => void;
  setShowEditModal: (value: boolean) => void;
  setEditUserId: (value: string) => void;
  setShowDeleteModal: (value: boolean) => void;
  users: any;
  userLoading: boolean;
  refetchUser: () => void;
  total: number;
};

export const UserContext = createContext<UserContextType | null>(null);

export const UserContextProvider = ({ children }: UserContextProviderType) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editUserId, setEditUserId] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const {
    datas: users,
    total,
    loading: userLoading,
    fetchDataFormUrl: refetchUser,
  } = useFetchDataFromUrl("user", adminAxios);
  return (
    <UserContext.Provider
      value={{
        showAddModal,
        setShowAddModal,
        showEditModal,
        setShowEditModal,
        showDeleteModal,
        setShowDeleteModal,
        editUserId,
        setEditUserId,
        users,
        userLoading,
        refetchUser,
        total,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
