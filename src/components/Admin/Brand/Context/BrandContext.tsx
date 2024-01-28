import { createContext, useState } from "react";
import { useFetchDataFromUrl } from "../../../../hooks/useFetchDataFromUrl";
import { adminAxios } from "../../../../services/adminInterceptor";
export type brandContextProviderType = {
  children: React.ReactNode;
};

export type brandContextType = {
  refetchBrands: () => void;
  brands: any;
  brandsLoading: boolean;
  openEditModal: boolean;
  setOpenEditModal: (value: boolean) => void;
  editBrandId: string;
  setEditBrandId: (value: string) => void;
  createBrandId: string;
  setCreateBrandId: (value: string) => void;
  showAddBrand: boolean;
  setShowAddBrand: (value: boolean) => void;
  showAddBrandFile: boolean;
  setShowAddBrandFile: (value: boolean) => void;
  total: number;
};

export const BrandContext = createContext<brandContextType | null>(null);

export const BrandContextProvider = ({
  children,
}: brandContextProviderType) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editBrandId, setEditBrandId] = useState("");
  const [createBrandId, setCreateBrandId] = useState("");
  const [showAddBrand, setShowAddBrand] = useState(true);
  const [showAddBrandFile, setShowAddBrandFile] = useState(false);
  const {
    datas: brands,
    total,
    loading: brandsLoading,
    fetchDataFormUrl: refetchBrands,
  } = useFetchDataFromUrl("brand", adminAxios);
  return (
    <BrandContext.Provider
      value={{
        brands,
        brandsLoading,
        refetchBrands,
        openEditModal,
        setOpenEditModal,
        editBrandId,
        setEditBrandId,
        createBrandId,
        setCreateBrandId,
        showAddBrand,
        setShowAddBrand,
        showAddBrandFile,
        setShowAddBrandFile,
        total,
      }}
    >
      {children}
    </BrandContext.Provider>
  );
};
