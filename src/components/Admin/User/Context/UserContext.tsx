import { createContext, useState } from "react";
import { useGetUserListQuery } from "../../../../Redux/apis/userApi";

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
};

export const UserContext = createContext<UserContextType | null>(null);

export const UserContextProvider = ({
  children,
}: UserContextProviderType) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editUserId, setEditUserId] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const {
    data: users,
    isLoading: userLoading,
    refetch: refetchUser,
  } = useGetUserListQuery("");
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
        refetchUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
