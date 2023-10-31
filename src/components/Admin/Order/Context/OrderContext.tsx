import { createContext, useState } from "react";
import { useGetOrderAdminQuery } from "../../../../Redux/apis/admin/orderAdminApi";
import { useFetchDataFromUrl } from "../../../../hooks/useFetchDataFromUrl";
import { adminAxios } from "../../../../services/adminInterceptor";

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
  total: number;
  totalOrders: any;
};

export const OrderContext = createContext<orderContextType | null>(null);

export const OrderContextProvider = ({
  children,
}: orderContextProviderType) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { data: totalOrders } = useGetOrderAdminQuery("");

  const {
    getFilterData: orders,
    total,
    loading: orderLoading,
    fetchDataFormUrl: refetchOrder,
  } = useFetchDataFromUrl("order", adminAxios);
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
        total,
        totalOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
