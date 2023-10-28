import { createContext, useState } from "react";
import { useGetOrderAdminQuery } from "../../../../Redux/apis/orderApi";

type orderContextProviderType = { children: React.ReactNode };

export type orderContextType = {
  showAddModal: boolean;
  showEditModal: boolean;
  showDeleteModal: boolean;
  setShowAddModal: (value: boolean) => void;
  setShowEditModal: (value: boolean) => void;
  setShowDeleteModal: (value: boolean) => void;
  orders: any;
  orderLoading: boolean;
  refetchOrder: () => void;
};

export const OrderContext = createContext<orderContextType | null>(null);

export const OrderContextProvider = ({
  children,
}: orderContextProviderType) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const {
    data: orders,
    isLoading: orderLoading,
    refetch: refetchOrder,
  } = useGetOrderAdminQuery("");
  return (
    <OrderContext.Provider
      value={{
        showAddModal,
        setShowAddModal,
        showEditModal,
        setShowEditModal,
        showDeleteModal,
        setShowDeleteModal,
        orders,
        orderLoading,
        refetchOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
