import { createContext, useState } from "react";
import { useFetchDataFromUrl } from "../../hooks/useFetchDataFromUrl";
import { adminAxios } from "../../services/adminInterceptor";

export type discountContextProviderType = {
  children: React.ReactNode;
};

export type discountContextType = {
  refetchDiscount: () => void;
  discounts: any;
  discountsLoading: boolean;
  openEditModal: boolean;
  setOpenEditModal: (value: boolean) => void;
  editDiscountId: string;
  setEditDiscountId: (value: string) => void;
  total: number;
  discountType: string;
  setDiscountType: any;
};

export const DiscountContext = createContext<discountContextType | null>(null);

export const DiscountContextProvider = ({
  children,
}: discountContextProviderType) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editDiscountId, setEditDiscountId] = useState("");
  const [discountType, setDiscountType] = useState("");

  const {
    datas: discounts,
    total,
    loading: discountsLoading,
    fetchDataFormUrl: refetchDiscount,
  } = useFetchDataFromUrl("discount", adminAxios);

  return (
    <DiscountContext.Provider
      value={{
        discounts,
        discountsLoading,
        refetchDiscount,
        openEditModal,
        setOpenEditModal,
        editDiscountId,
        setEditDiscountId,
        total,
        discountType,
        setDiscountType,
      }}
    >
      {children}
    </DiscountContext.Provider>
  );
};
